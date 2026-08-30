import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.expense.create({
      data: createExpenseDto,
    });
  }

  findAll() {
    return this.databaseService.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: { id },
    });
    if (!expense) {
      throw new NotFoundException(`Nie znaleziono wydatku o ID ${id}`);
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.databaseService.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: { id },
    });
  }
}