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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TripService = class TripService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createTripDto) {
        return this.prisma.trip.create({
            data: {
                ...createTripDto,
                startDate: new Date(createTripDto.startDate),
                endDate: createTripDto.endDate ? new Date(createTripDto.endDate) : null,
            },
        });
    }
    findAll() {
        return this.prisma.trip.findMany({
            include: { participants: true, expenses: true },
        });
    }
    async findOne(id) {
        const trip = await this.prisma.trip.findUnique({
            where: { id },
            include: { participants: true, expenses: true },
        });
        if (!trip)
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        return trip;
    }
    async update(id, updateTripDto) {
        await this.findOne(id);
        return this.prisma.trip.update({
            where: { id },
            data: {
                ...updateTripDto,
                startDate: updateTripDto.startDate ? new Date(updateTripDto.startDate) : undefined,
                endDate: updateTripDto.endDate ? new Date(updateTripDto.endDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.trip.delete({ where: { id } });
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripService);
//# sourceMappingURL=trip.service.js.map