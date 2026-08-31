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

