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

  const config = new DocumentBuilder()
    .setTitle('Trip Management API')
    .setDescription('Dokumentacja API do zarządzania wycieczkami, uczestnikami i wydatkami')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('trips', 'Zarządzanie wycieczkami')
    .addTag('participant', 'Zarządzanie uczestnikami')
    .addTag('expenses', 'Zarządzanie wydatkami')
    .addTag('auth', 'Uwierzytelnianie i autoryzacja')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
