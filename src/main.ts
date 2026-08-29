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
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Wakacyjne Wyzwanie Solvro')
    .setDescription(
      'Dokumentacja API dla aplikacji zarządzania wycieczkami, uczestnikami i wydatkami',
    )
    .setVersion('1.0')
    .addTag('trip', 'Zarządzanie wycieczkami')
    .addTag('participants', 'Zarządzanie uczestnikami')
    .addTag('expense', 'Zarządzanie wydatkami')
    .addTag('solvro', 'Endpointy pomocnicze Solvro')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
