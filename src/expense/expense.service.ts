import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const participant = await this.prisma.participant.findUnique({
      where: { id: createExpenseDto.participant_id },
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with ID ${createExpenseDto.participant_id} not found.`,
      );
    }

    const trip = await this.prisma.trip.findUnique({
      where: { id: createExpenseDto.trip_id },
    });

    if (!trip) {
      throw new NotFoundException(
        `Trip with ID ${createExpenseDto.trip_id} not found.`,
      );
    }

    return this.prisma.expense.create({
      data: createExpenseDto,
    });
  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found.`);
    }

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

    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
