import { Test, TestingModule } from '@nestjs/testing';
import { XyzController } from './xyz.controller';
import { XyzService } from './xyz.service';

describe('XyzController', () => {
  let controller: XyzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XyzController],
      providers: [XyzService],
    }).compile();

    controller = module.get<XyzController>(XyzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
