import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: { ...createExpenseDto, datetime: new Date(createExpenseDto.datetime) },
    });
  }

  findAll(skip?: number, take?: number) {
    return this.prisma.expense.findMany({
      skip,
      take,
      include: { trip: true, paidBy: true },
    });
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: { trip: true, paidBy: true },
    });
    if (!expense) throw new NotFoundException(`Expense o id ${id} nie istnieje`);
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    const { datetime, ...rest } = updateExpenseDto;
    return this.prisma.expense.update({
      where: { id },
      data: { ...rest, ...(datetime && { datetime: new Date(datetime) }) },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.expense.delete({ where: { id } });
  }
}
