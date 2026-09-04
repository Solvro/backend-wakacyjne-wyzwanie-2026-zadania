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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExpenseService = class ExpenseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createExpenseDto) {
        return this.prisma.expense.create({ data: createExpenseDto });
    }
    findAll() {
        return this.prisma.expense.findMany({
            include: { trip: true, paidBy: true },
        });
    }
    async findOne(id) {
        const expense = await this.prisma.expense.findUnique({ where: { id } });
        if (!expense)
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        return expense;
    }
    async update(id, updateExpenseDto) {
        await this.findOne(id);
        return this.prisma.expense.update({
            where: { id },
            data: updateExpenseDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.expense.delete({ where: { id } });
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map