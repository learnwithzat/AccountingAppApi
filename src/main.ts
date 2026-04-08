/** @format */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as express from 'express'; // ✅ Needed for express.raw()

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

  app.use(helmet());

  /* 🔥 FORCE CORS HEADERS (IMPORTANT) */
  app.use((req: any, res: any, next: any) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://app.zatgo.online',
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );

    res.header('Access-Control-Allow-Credentials', 'true');

    /* ✅ HANDLE PREFLIGHT */
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  });

  /* Enable NestJS CORS (optional but safe) */
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://app.zatgo.online',
      'https://admin.zf.zatgo.online',
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  /* 🔹 Stripe webhook needs raw body */
  app.use('/webhook/stripe', express.raw({ type: 'application/json' }));

  app.setGlobalPrefix('api');

  app.use(tenantMiddleware);

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api`);
}

bootstrap();
