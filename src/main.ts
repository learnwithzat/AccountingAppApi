import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  const reflector = app.get(Reflector); // ✅ DI

  app.useGlobalGuards(new JwtAuthGuard(reflector)); // ✅ FIXED

  const port = process.env.API_PORT || 5000;

  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}

bootstrap();
