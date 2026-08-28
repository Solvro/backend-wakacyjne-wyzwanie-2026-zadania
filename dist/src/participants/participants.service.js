"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ParticipantsService = class ParticipantsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    findAll() {
        return this.databaseService.participant.findMany({
            include: { trip: true, expenses: true },
        });
    }
    create(createParticipantDto) {
        return this.databaseService.participant.create({
            data: {
                name: createParticipantDto.name,
                tripId: createParticipantDto.tripId,
            },
        });
    }
    async findOne(id) {
        const participant = await this.databaseService.participant.findUnique({
            where: { id },
            include: { trip: true, expenses: true },
        });
        if (!participant) {
            throw new common_1.NotFoundException(`Participant with ID ${id} not found`);
        }
        return participant;
    }
    async update(id, updateParticipantDto) {
        await this.findOne(id);
        return this.databaseService.participant.update({
            where: { id },
            data: {
                name: updateParticipantDto.name,
                tripId: updateParticipantDto.tripId,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.databaseService.participant.delete({ where: { id } });
    }
};
exports.ParticipantsService = ParticipantsService;
exports.ParticipantsService = ParticipantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.DatabaseService])
], ParticipantsService);
//# sourceMappingURL=participants.service.js.map