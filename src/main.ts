import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowedRegex = /^http:\/\/localhost:(5[0-5][0-9]{2})$/;

      if (!origin || allowedRegex.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Niedozwolone przez mechanizm CORS'));
      }
    },
  });

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
