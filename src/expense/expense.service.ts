import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}
  create(CreateExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: CreateExpenseDto });
  }

  findAll() {
    return this.prisma.expense.findMany({
      include: { trip: true, payer: true },
    });
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { expense_id: id },
    });
    if (!expense) {
      throw new NotFoundException();
    }
    return expense;
  }

  update(id: number, UpdateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { expense_id: id },
      data: UpdateExpenseDto,
    });
  }

  remove(id: number) {
    return this.prisma.expense.delete({ where: { expense_id: id } });
  }
}
