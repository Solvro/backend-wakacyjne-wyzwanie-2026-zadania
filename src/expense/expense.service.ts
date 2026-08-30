import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  findAll() {
    return this.prisma.expense.findMany({
      include: { trip: true, paidBy: true },
    });
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException(`Expense with ID ${id} not found`);
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.expense.delete({ where: { id } });
  }
}