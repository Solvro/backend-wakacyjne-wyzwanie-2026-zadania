import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
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

  describe('redirectToSolvro', () => {
    it('should redirect to the KN Solvro website with status 307', () => {
      expect(appController.redirectToSolvro()).toEqual({
        url: 'https://solvro.pwr.edu.pl',
        statusCode: HttpStatus.TEMPORARY_REDIRECT,
      });
    });
  });

  describe('brewCoffee', () => {
    it('should return the teapot payload', () => {
      expect(appController.brewCoffee()).toEqual({
        message: "I'm a teapot",
        funnyPictureURL: 'https://http.cat/images/418.jpg',
      });
    });
  });
});
