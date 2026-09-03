import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        title: createExpenseDto.title,
        amount: createExpenseDto.amount,
        currency: createExpenseDto.currency,
        date: new Date(createExpenseDto.date),
        trip_id: createExpenseDto.trip_id,
        paid_by_participant_id: createExpenseDto.paid_by_participant_id,
      },
      include: {
        trip: true,
        participant: true,
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany({
      include: {
        trip: true,
        participant: true,
      },
    });
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        trip: true,
        participant: true,
      },
    });
    if (!expense) {
      throw new NotFoundException(`Wydatek o ID ${id} nie został znaleziony`);
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.prisma.expense.update({
      where: { id },
      data: {
        ...(updateExpenseDto.title !== undefined && { title: updateExpenseDto.title }),
        ...(updateExpenseDto.amount !== undefined && { amount: updateExpenseDto.amount }),
        ...(updateExpenseDto.currency !== undefined && { currency: updateExpenseDto.currency }),
        ...(updateExpenseDto.date !== undefined && {
          date: new Date(updateExpenseDto.date),
        }),
        ...(updateExpenseDto.trip_id !== undefined && { trip_id: updateExpenseDto.trip_id }),
        ...(updateExpenseDto.paid_by_participant_id !== undefined && {
          paid_by_participant_id: updateExpenseDto.paid_by_participant_id,
        }),
      },
      include: {
        trip: true,
        participant: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
