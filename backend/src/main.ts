import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.use('/public', express.static(path.join(__dirname, '..', 'public')));

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://elearn.sanjayms.online/'
    ],
    // origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

