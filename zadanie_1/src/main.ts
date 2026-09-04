import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // KONFIGURACJA CORS (localhost, porty 5000-5599)
  app.enableCors({
    origin: (origin, callback) => {
      // Zezwalaj na zapytania bez nagłówka Origin (np. Postman, Swagger UI, mobilki)
      if (!origin) {
        return callback(null, true);
      }

      // Wyrażenie sprawdzające localhost lub 127.0.0.1 z dowolnym portem
      const allowedPortsRegex = /^http:\/\/(localhost|127\.0\.0\.1):(5[0-9]{3})$/;
      const match = origin.match(allowedPortsRegex);

      if (match) {
        const port = parseInt(match[2], 10);
        // Akceptujemy wyłącznie porty od 5000 do 5599 włącznie
        if (port >= 5000 && port <= 5599) {
          return callback(null, true);
        }
      }

      callback(new Error('Dostęp zablokowany przez politykę CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Wakacyjne wyzwanie 2026')
    .setDescription('API do obsługi wyzwania wakacyjnego 2026')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();