import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config as AWSConfig } from 'aws-sdk';
import * as express from 'express';
import * as path from 'path';

AWSConfig.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/public', express.static(path.join(__dirname, '..', 'public')));
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
