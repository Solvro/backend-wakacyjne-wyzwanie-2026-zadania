import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
    }),
  );

  const config = new DocumentBuilder()
  .setTitle("Trip API - Task 3")
  .setDescription("api for managing trips, expenses and participants")
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
