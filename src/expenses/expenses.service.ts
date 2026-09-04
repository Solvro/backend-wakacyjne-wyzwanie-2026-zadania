import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(userId: number) {
    return this.databaseService.expense.findMany({
      where: { trip: { userId } },
      include: { trip: true, participant: true },
    });
  }

  async create(userId: number, createExpenseDto: CreateExpenseDto) {
    await this.validateRelations(userId, createExpenseDto.tripId, createExpenseDto.participantId);
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

  async findOne(userId: number, id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: { id, trip: { userId } },
      include: { trip: true, participant: true },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return expense;
  }

  async update(userId: number, id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(userId, id);
    const tripId = updateExpenseDto.tripId ?? expense.tripId;
    const participantId = updateExpenseDto.participantId ?? expense.participantId;
    await this.validateRelations(userId, tripId, participantId);

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

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.databaseService.expense.delete({ where: { id } });
  }

  private async validateRelations(userId: number, tripId: number, participantId: number) {
    const trip = await this.databaseService.trip.findFirst({ where: { id: tripId, userId } });
    const participant = await this.databaseService.participant.findFirst({
      where: { id: participantId, tripId },
    });

    if (!trip || !participant) {
      throw new NotFoundException('Trip lub uczestnik nie istnieje w Twoich danych');
    }
  }
}