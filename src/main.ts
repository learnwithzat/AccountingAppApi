/** @format */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as express from 'express';

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
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /* ✅ Global validation */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  /* 🧠 Tenant Middleware */
  app.use(tenantMiddleware);

  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api`);
}

bootstrap();
