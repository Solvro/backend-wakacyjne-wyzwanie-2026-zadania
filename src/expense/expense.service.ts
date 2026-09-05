import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  findOne(id: number) {
    const expense = this.prisma.expense.findUnique({ where: { id } });

    if(!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return await this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.expense.delete({
      where: { id },
    });
  }
}
