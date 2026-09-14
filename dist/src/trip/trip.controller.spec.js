"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const trip_controller_1 = require("./trip.controller");
const trip_service_1 = require("./trip.service");
describe('TripController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [trip_controller_1.TripController],
            providers: [trip_service_1.TripService],
        }).compile();
        controller = module.get(trip_controller_1.TripController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=trip.controller.spec.js.map