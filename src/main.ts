import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    const portRegex = /^http:\/\/(localhost|127\.0\.0\.1):(500[0-9]|50[1-9][0-9]|5[1-4][0-9]{2}|5500)$/;

    if (portRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Budgeting API')
    .setDescription('API documentation for the Trip Budgeting app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();