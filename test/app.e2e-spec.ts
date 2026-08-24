import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/solvro (GET)', () => {
    return request(app.getHttpServer())
      .get('/solvro')
      .expect(307)
      .expect('Location', 'https://solvro.pwr.edu.pl');
  });

  afterEach(async () => {
    await app.close();
  });
});
