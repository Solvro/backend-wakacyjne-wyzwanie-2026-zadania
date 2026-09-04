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
    findAll() {
        return this.databaseService.expense.findMany({
            include: { trip: true, participant: true },
        });
    }
    create(createExpenseDto) {
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
    async findOne(id) {
        const expense = await this.databaseService.expense.findUnique({
            where: { id },
            include: { trip: true, participant: true },
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }
    async update(id, updateExpenseDto) {
        await this.findOne(id);
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
    async remove(id) {
        await this.findOne(id);
        return this.databaseService.expense.delete({ where: { id } });
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.DatabaseService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map