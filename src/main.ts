/** @format */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as express from 'express';

/* 🧠 Tenant Middleware */
const tenantMiddleware = (req: any, _: any, next: () => void) => {
  const parts = req.hostname?.split('.') || [];
  let subdomain = null;

  // Support both production (tenant.zatgo.online) and local (tenant.localhost)
  if (parts.length > 2) {
    subdomain = parts[0];
  } else if (parts.length === 2 && parts[1] === 'localhost') {
    subdomain = parts[0];
  }

  req.tenantId = req.headers['x-tenant-id'] || subdomain || null;
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 5000;

  app.use(helmet());

  /* ✅ Body parsers (default behavior restored) */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* ✅ Proper CORS */
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://app.zatgo.online',
      'https://admin.zf.zatgo.online',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-Id'],
  });

  /* ✅ Global validation */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  /* 🧠 Tenant Middleware */
  app.use(tenantMiddleware);

  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api`);
}

bootstrap();
