import { Test, TestingModule } from '@nestjs/testing';
import { TripParticipantsController } from './trip_participants.controller';
import { TripParticipantsService } from './trip_participants.service';
describe('TripParticipantsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [TripParticipantsController],
            providers: [TripParticipantsService],
        }).compile();
        controller = module.get(TripParticipantsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=trip_participants.controller.spec.js.map