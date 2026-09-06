import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Trip Expenses API')
    .setDescription('Dokumentacja API do zarządzania wycieczkami, uczestnikami i wydatkami')
    .setVersion('1.0')
    .addTag('participants', 'Zarządzanie uczestnikami')
    .addTag('trips', 'Zarządzanie wycieczkami')
    .addTag('expenses', 'Zarządzanie wydatkami')
    .addTag('auth', 'Uwierzytelnianie i autoryzacja')
    .addTag('user', 'Zarządzanie profilem użytkownika')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
