import { Test, TestingModule } from '@nestjs/testing';
import { TripParticipantsController } from './trip_participants.controller';
import { TripParticipantsService } from './trip_participants.service';

describe('TripParticipantsController', () => {
  let controller: TripParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripParticipantsController],
      providers: [TripParticipantsService],
    }).compile();

    controller = module.get<TripParticipantsController>(TripParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
