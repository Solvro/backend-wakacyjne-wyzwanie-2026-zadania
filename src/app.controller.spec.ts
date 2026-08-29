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
    it('should return teapot message', () => {
      expect(appController.brewCoffee()).toEqual({
        message: "I'm a teapot",
        funnyPictureURL: 'https://http.cat/images/418.jpg',
      });
    });
  });
});
