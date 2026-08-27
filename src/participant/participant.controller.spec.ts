import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

describe('ParticipantController', () => {
  let controller: ParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [ParticipantService],
    }).compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
