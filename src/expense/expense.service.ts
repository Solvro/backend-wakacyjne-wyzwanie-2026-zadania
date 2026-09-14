import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: { ...dto, date: new Date(dto.date) },
    });
  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException(`Expense with ID ${id} not found`);
    return expense;
  }

  async update(id: number, dto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.prisma.expense.update({
      where: { id },
      data: { ...dto, ...(dto.date && { date: new Date(dto.date) }) },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.expense.delete({ where: { id } });
  }
}