import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.prisma.expense.create({
      data: {
        TripID: createExpenseDto.TripID,
        ExpenseName: createExpenseDto.ExpenseName,
        Cost: createExpenseDto.Cost,
      },
    });
  }

  async findAll(): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      include: {
        Trip: true,
      },
    });
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({
      where: { ExpenseID: id },
      include: {
        Trip: true,
      },
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

    return this.prisma.expense.update({
      where: { ExpenseID: id },
      data: {
        ...(updateExpenseDto.TripID !== undefined && {
          TripID: updateExpenseDto.TripID,
        }),
        ...(updateExpenseDto.ExpenseName !== undefined && {
          ExpenseName: updateExpenseDto.ExpenseName,
        }),
        ...(updateExpenseDto.Cost !== undefined && {
          Cost: updateExpenseDto.Cost,
        }),
      },
    });
  }

  async remove(id: number): Promise<Expense> {
    await this.findOne(id);

    return this.prisma.expense.delete({
      where: { ExpenseID: id },
    });
  }
}
