import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: DatabaseService){}

  async create(createExpenseDto: CreateExpenseDto) {
    const participant = await this.prisma.participant.findUnique({
      where: { id: createExpenseDto.participantId },
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with ID ${createExpenseDto.participantId} not exist.`,
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
      throw new NotFoundException(`Expense wtih ID ${id} not exist.`);
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
