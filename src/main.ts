import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
      .setTitle('Planer podróży API')
      .setDescription('API do zarządzania podróżami, uczestnikami i wydatkami')
      .setVersion('1.0')
      .addTag("API")
      .addBearerAuth()
      .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(80, '127.0.0.1');
}
bootstrap();
