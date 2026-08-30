"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const trip_service_1 = require("./trip.service");
describe('TripService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [trip_service_1.TripService],
        }).compile();
        service = module.get(trip_service_1.TripService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=trip.service.spec.js.map