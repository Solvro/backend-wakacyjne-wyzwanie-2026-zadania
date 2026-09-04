import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Trip Expense API')
    .setDescription(
      'The API documentation for managing trips, participants, and expenses.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);
  const corsEntries = configService
    .getOrThrow<string>('CORS_ORIGINS')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const allowAll = corsEntries.includes('*');
  const exactOrigins = new Set(corsEntries.filter((o) => !o.startsWith('*.')));
  const wildcardDomains = corsEntries
    .filter((o) => o.startsWith('*.'))
    .map((o) => o.slice(1));

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (origin === undefined) {
        callback(null, true);
        return;
      }

      if (allowAll) {
        callback(null, true);
        return;
      }

      if (exactOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      if (wildcardDomains.some((domain) => origin.endsWith(domain))) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
