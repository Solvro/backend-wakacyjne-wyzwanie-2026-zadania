"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const participant_controller_1 = require("./participant.controller");
const participant_service_1 = require("./participant.service");
describe('ParticipantController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [participant_controller_1.ParticipantController],
            providers: [participant_service_1.ParticipantService],
        }).compile();
        controller = module.get(participant_controller_1.ParticipantController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=participant.controller.spec.js.map