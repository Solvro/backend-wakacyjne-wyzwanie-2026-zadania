import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
describe('TripsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [TripsController],
            providers: [TripsService],
        }).compile();
        controller = module.get(TripsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=trips.controller.spec.js.map