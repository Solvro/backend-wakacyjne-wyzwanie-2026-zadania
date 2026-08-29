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

  const config = new DocumentBuilder()
    .setTitle("Trip Budgeting API")
    .setDescription("Allows for tracking the expenses of people on trips.")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory)
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
