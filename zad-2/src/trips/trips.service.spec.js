import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';
describe('TripsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TripsService],
        }).compile();
        service = module.get(TripsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=trips.service.spec.js.map