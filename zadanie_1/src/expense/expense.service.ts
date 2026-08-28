import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // sprawdź ścieżkę do swojego PrismaService
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  async findAll() {
    return this.prisma.expense.findMany({});
  }

  async findOne(id: number) {
    const Expense = await this.prisma.expense.findUnique({
      where: { Expense_id: id },
    });
    if (!Expense)
      throw new NotFoundException(`Wycieczka o ID ${id} nie istnieje`);
    return Expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id); // Sprawdzenie, czy wycieczka istnieje
    return this.prisma.expense.update({
      where: { Expense_id: id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Sprawdzenie, czy wycieczka istnieje
    return this.prisma.expense.delete({ where: { Expense_id: id } });
  }
}
