import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import 'dotenv/config';

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString(); // Convert to string for serialization
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const dc = new DocumentBuilder()
    .setTitle("Trip App")
    .setDescription("API docs for trip app")
    .setVersion("1.0")
    .build();
  const df = () => SwaggerModule.createDocument(app, dc);
  SwaggerModule.setup("api", app, df, {
    swaggerUrl: "/docs"
  });

  const port = process.env.PORT || 3000;
  console.log("Running on port " + port);
  await app.listen(port);
}

bootstrap();