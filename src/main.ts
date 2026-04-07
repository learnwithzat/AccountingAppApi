/** @format */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

/* =====================================================
   🧠 SIMPLE TENANT MIDDLEWARE
===================================================== */
function tenantMiddleware(req: any, _: any, next: () => void) {
  // Priority: Header -> Subdomain -> null
  const headerTenant = req.headers['x-tenant-id'];
  const subdomain =
    req.hostname?.split('.')?.length > 2 ? req.hostname.split('.')[0] : null;

  req.tenantId = headerTenant || subdomain || null;
  next();
}

/* =====================================================
   🚀 BOOTSTRAP
===================================================== */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('App');

  const port = config.get<number>('PORT', 5000);
  const origins = config
    .get<string>('CORS_ORIGIN', 'http://localhost:3000')
    .split(',');

  /* 🔒 Security headers */
  app.use(helmet());

  /* 🌐 CORS for allowed origins */
  app.enableCors({
    origin: origins,
    credentials: true,
  });

  /* 🧾 Request validation */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra properties
      transform: true, // auto-transform payloads
    }),
  );

  /* 🔗 Global API prefix */
  app.setGlobalPrefix('api');

  /* 🧠 Tenant middleware */
  app.use(tenantMiddleware);

  await app.listen(port);

  logger.log(
    `🚀 Server running: https://accountingappapi-b52i.onrender.com:${port}/api`,
  );
}

bootstrap().catch((err) => {
  new Logger('Bootstrap').error('Startup failed', err);
  process.exit(1);
});
