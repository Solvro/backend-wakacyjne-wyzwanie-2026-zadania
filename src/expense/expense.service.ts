import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.expense.create({ data: createExpenseDto });
  }

  findMany() {
    return this.databaseService.expense.findMany();
  }

  findOne(id: number) {
    return this.databaseService.expense.findUnique({ where: { id } });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.databaseService.expense.update({ where: { id }, data: updateExpenseDto });
  }

  remove(id: number) {
    return this.databaseService.expense.delete({ where: { id } });
  }
}