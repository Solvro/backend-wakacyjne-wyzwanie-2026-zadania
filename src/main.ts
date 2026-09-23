import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin === 'http://localhost:3000') return callback(null, true);

      const match = /^http:\/\/localhost:(\d{4,5})$/.exec(origin);
      const port = match ? parseInt(match[1], 10) : null;
      if (port !== null && port >= 5000 && port <= 5599) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Budżetownik API')
    .setDescription('CRUD dla wycieczek, uczestników i wydatków, z autoryzacją JWT')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
