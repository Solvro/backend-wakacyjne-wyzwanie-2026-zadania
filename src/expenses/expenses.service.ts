import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.expense.findMany({
      include: { trip: true, participant: true },
    });
  }

  create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.expense.create({
      data: {
        cost: createExpenseDto.cost,
        description: createExpenseDto.description,
        date: new Date(createExpenseDto.date),
        tripId: createExpenseDto.tripId,
        participantId: createExpenseDto.participantId,
      },
    });
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: { id },
      include: { trip: true, participant: true },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);

    return this.databaseService.expense.update({
      where: { id },
      data: {
        cost: updateExpenseDto.cost,
        description: updateExpenseDto.description,
        date: updateExpenseDto.date ? new Date(updateExpenseDto.date) : undefined,
        tripId: updateExpenseDto.tripId,
        participantId: updateExpenseDto.participantId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.expense.delete({ where: { id } });
  }
}