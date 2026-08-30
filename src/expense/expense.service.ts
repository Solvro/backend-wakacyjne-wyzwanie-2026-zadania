import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from 'src/database/database.service';
import { Expense } from 'generated/prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.databaseService.expense.create({
      data: {
        tripId: createExpenseDto.tripId,
        payerId: createExpenseDto.payerId,
        amount: createExpenseDto.amount,
        description: createExpenseDto.description,
        expenseDate: new Date(createExpenseDto.expenseDate),
      },
    });
  }

  async findAll(): Promise<Expense[]> {
    return this.databaseService.expense.findMany();
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.databaseService.expense.findUnique({
      where: { id },
    });
    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    await this.findOne(id);
    return this.databaseService.expense.update({
      where: { id },
      data: {
        tripId: updateExpenseDto.tripId,
        payerId: updateExpenseDto.payerId,
        amount: updateExpenseDto.amount,
        description: updateExpenseDto.description,
        expenseDate: updateExpenseDto.expenseDate
          ? new Date(updateExpenseDto.expenseDate)
          : undefined,
      },
    });
  }

  async remove(id: number): Promise<Expense> {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: { id },
    });
  }
}
