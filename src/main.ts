/** @format */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

/* 🧠 Tenant Middleware */
const tenantMiddleware = (req: any, _: any, next: () => void) => {
  const subdomain =
    req.hostname?.split('.')?.length > 2 ? req.hostname.split('.')[0] : null;

  req.tenantId = req.headers['x-tenant-id'] || subdomain || null;
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = config.get<number>('PORT') || 5000;

  /* 🔒 Security */
  app.use(helmet());

  /* 🌐 CORS (FIXED) */
  const origins = config.get<string>('CORS_ORIGIN')?.split(',') || [
    'http://localhost:3000',
    'https://app.zatgo.online',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // allow non-browser requests (like Postman)
      if (!origin) return callback(null, true);

      if (origins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  /* ⚠️ Handle preflight (important for Render) */
  app.use((req: any, res: any, next: any) => {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  /* 🧾 Validation */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  /* 🔗 Prefix */
  app.setGlobalPrefix('api');

  /* 🧠 Tenant */
  app.use(tenantMiddleware);

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}/api`);
}

bootstrap();
