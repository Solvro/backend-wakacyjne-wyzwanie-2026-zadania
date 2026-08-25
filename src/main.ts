import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/');

  const config = new DocumentBuilder()
    .setTitle('Wakacyjne Wyzwanie API')
    .setDescription('Dokumentacja API dla aplikacji zarządzającej wycieczkami')
    .setVersion('1.0')
    .addTag('Trips', 'Operacje na wycieczkach')
    .addTag('Participants', 'Operacje na uczestnikach')
    .addTag('Expenses', 'Operacje na wydatkach')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
