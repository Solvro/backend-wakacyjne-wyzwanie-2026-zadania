import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const match = origin.match(/^http:\/\/localhost:(\d+)$/);

      if (match) {
        const port = Number(match[1]);
        if (port >= 5000 && port <= 5599) {
          return callback(null, true);
        }
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("CRUD dla wycieczek, uczestników i wydatków")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

