"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const participant_service_1 = require("./participant.service");
describe('ParticipantService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [participant_service_1.ParticipantService],
        }).compile();
        service = module.get(participant_service_1.ParticipantService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=participant.service.spec.js.map