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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TripsService = class TripsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    findAll(userId) {
        return this.databaseService.trip.findMany({
            where: { userId },
            include: { expenses: true, participants: true },
        });
    }
    create(userId, createTripDto) {
        return this.databaseService.trip.create({
            data: {
                destination: createTripDto.destination,
                startDate: new Date(createTripDto.startDate),
                endDate: createTripDto.endDate ? new Date(createTripDto.endDate) : undefined,
                status: createTripDto.status,
                userId,
            },
        });
    }
    async findOne(userId, id) {
        const trip = await this.databaseService.trip.findUnique({
            where: { id, userId },
            include: { expenses: true, participants: true },
        });
        if (!trip) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return trip;
    }
    async update(userId, id, updateTripDto) {
        await this.findOne(userId, id);
        return this.databaseService.trip.update({
            where: { id },
            data: {
                destination: updateTripDto.destination,
                startDate: updateTripDto.startDate ? new Date(updateTripDto.startDate) : undefined,
                endDate: updateTripDto.endDate ? new Date(updateTripDto.endDate) : undefined,
                status: updateTripDto.status,
            },
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.databaseService.trip.delete({ where: { id, userId } });
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.DatabaseService])
], TripsService);
//# sourceMappingURL=trips.service.js.map