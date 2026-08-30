import { Test, TestingModule } from '@nestjs/testing';
import { TripParticipantsService } from './trip_participants.service';

describe('TripParticipantsService', () => {
  let service: TripParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripParticipantsService],
    }).compile();

    service = module.get<TripParticipantsService>(TripParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
