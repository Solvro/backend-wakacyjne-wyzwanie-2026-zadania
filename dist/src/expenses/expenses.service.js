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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ExpensesService = class ExpensesService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    findAll(userId) {
        return this.databaseService.expense.findMany({
            where: { trip: { userId } },
            include: { trip: true, participant: true },
        });
    }
    async create(userId, createExpenseDto) {
        await this.validateRelations(userId, createExpenseDto.tripId, createExpenseDto.participantId);
        return this.databaseService.expense.create({
            data: {
                cost: createExpenseDto.cost,
                description: createExpenseDto.description,
                date: new Date(createExpenseDto.date),
                tripId: createExpenseDto.tripId,
                participantId: createExpenseDto.participantId,
            },
        });
    }
    async findOne(userId, id) {
        const expense = await this.databaseService.expense.findUnique({
            where: { id, trip: { userId } },
            include: { trip: true, participant: true },
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }
    async update(userId, id, updateExpenseDto) {
        const expense = await this.findOne(userId, id);
        const tripId = updateExpenseDto.tripId ?? expense.tripId;
        const participantId = updateExpenseDto.participantId ?? expense.participantId;
        await this.validateRelations(userId, tripId, participantId);
        return this.databaseService.expense.update({
            where: { id },
            data: {
                cost: updateExpenseDto.cost,
                description: updateExpenseDto.description,
                date: updateExpenseDto.date ? new Date(updateExpenseDto.date) : undefined,
                tripId: updateExpenseDto.tripId,
                participantId: updateExpenseDto.participantId,
            },
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.databaseService.expense.delete({ where: { id } });
    }
    async validateRelations(userId, tripId, participantId) {
        const trip = await this.databaseService.trip.findFirst({ where: { id: tripId, userId } });
        const participant = await this.databaseService.participant.findFirst({
            where: { id: participantId, tripId },
        });
        if (!trip || !participant) {
            throw new common_1.NotFoundException('Trip lub uczestnik nie istnieje w Twoich danych');
        }
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.DatabaseService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map