import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('brewCoffee', () => {
    it('should return teapot payload', () => {
      expect(appController.getBrewCoffee()).toEqual({
        message: 'I\'m a teapot',
        URL: 'https://http.cat/images/418.jpg',
      });
    });
  });
});
