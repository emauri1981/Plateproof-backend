// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create Nest app from the root AppModule
  const app = await NestFactory.create(AppModule);

  // Allow your mobile app / web frontend to call this API
  app.enableCors({
    origin: true,          // allows any origin in dev; you can lock this down later
    credentials: true,
  });

  // All routes will be under /api (e.g. /api/auth/login)
  app.setGlobalPrefix('api');

  // Global validation for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // strips unknown fields
      forbidNonWhitelisted: true, // throws if extra fields are sent
      transform: true,            // auto-casts types (strings → numbers, etc.)
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Port from env or default 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 PlateProof backend running on port ${port}`);
}

bootstrap();
