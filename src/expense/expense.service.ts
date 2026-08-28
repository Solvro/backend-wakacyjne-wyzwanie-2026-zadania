import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.expense.findMany({ skip, take: limit }),
      this.prisma.expense.count(),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { Expense_id: id },
    });

    if (!expense) {
      throw new NotFoundException(`Wydatek o id ${id} nie istnieje`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);

    return this.prisma.expense.update({
      where: { Expense_id: id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.expense.delete({
      where: { Expense_id: id },
    });
  }
}