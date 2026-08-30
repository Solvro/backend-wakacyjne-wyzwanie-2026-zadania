var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
let ExpensesService = class ExpensesService {
    create(createExpenseDto) {
        return 'This action adds a new expense';
    }
    findAll() {
        return `This action returns all expenses`;
    }
    findOne(id) {
        return `This action returns a #${id} expense`;
    }
    update(id, updateExpenseDto) {
        return `This action updates a #${id} expense`;
    }
    remove(id) {
        return `This action removes a #${id} expense`;
    }
};
ExpensesService = __decorate([
    Injectable()
], ExpensesService);
export { ExpensesService };
//# sourceMappingURL=expenses.service.js.map