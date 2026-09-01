import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.expense.create({
      data: {
        amount: createExpenseDto.amount,
        currency: createExpenseDto.currency,
        tripId: createExpenseDto.tripId,
      },
    });
  }

  async findAll(skip?: number, take?: number) {
    return this.databaseService.expense.findMany({
      skip,
      take,
    });
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.databaseService.expense.update({
      where: { id },
      data: {
        amount: updateExpenseDto.amount,
        currency: updateExpenseDto.currency,
        tripId: updateExpenseDto.tripId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: { id },
    });
  }
}
