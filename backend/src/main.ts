import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.use('/public', express.static(path.join(__dirname, '..', 'public')));

  app.use('/', express.static(path.join(__dirname, '..', 'dist/frontend')));
  app.use('/*', express.static(path.join(__dirname, '..', 'dist/frontend')));

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:4200']
    // origin: "*"
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
