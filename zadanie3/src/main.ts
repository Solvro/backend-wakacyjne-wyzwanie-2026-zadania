import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
  .setTitle("Trips API")
  .setDescription("My first API")
  .setVersion("1.0")
  .addTag("API")
  .addBearerAuth()
  .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory)
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();








