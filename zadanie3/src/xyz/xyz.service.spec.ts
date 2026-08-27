import { Test, TestingModule } from '@nestjs/testing';
import { XyzService } from './xyz.service';

describe('XyzService', () => {
  let service: XyzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XyzService],
    }).compile();

    service = module.get<XyzService>(XyzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
