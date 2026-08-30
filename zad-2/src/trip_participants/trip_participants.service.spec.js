import { Test, TestingModule } from '@nestjs/testing';
import { TripParticipantsService } from './trip_participants.service';
describe('TripParticipantsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TripParticipantsService],
        }).compile();
        service = module.get(TripParticipantsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=trip_participants.service.spec.js.map