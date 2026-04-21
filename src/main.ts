/** @format */

import 'dotenv/config'; // ✅ MUST BE FIRST

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const port = process.env.API_PORT || 5000;

  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
  console.log({
    DB: process.env.DATABASE_URL,
    PORT: process.env.API_PORT,
    CORS: process.env.CORS_ORIGIN,
  });
}

bootstrap();
