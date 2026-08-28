import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  private async ensureTripExists(tripId: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new NotFoundException(
        `Unable to find trip with ID of ${tripId.toString()}`,
      );
    }
  }

  private async ensureBuyerBelongsToTrip(
    participantId: number,
    tripId: number,
  ) {
    const participant = await this.databaseService.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      throw new NotFoundException(
        `Unable to find participant with ID of ${participantId.toString()}`,
      );
    }

    if (participant.tripId !== tripId) {
      throw new BadRequestException(
        'The buyer must be a participant of the same trip as the expense',
      );
    }
  }

  async create(createExpenseDto: CreateExpenseDto) {
    await this.ensureTripExists(createExpenseDto.tripId);

    if (createExpenseDto.participantId) {
      await this.ensureBuyerBelongsToTrip(
        createExpenseDto.participantId,
        createExpenseDto.tripId,
      );
    }

    return this.databaseService.expense.create({
      data: {
        ...createExpenseDto,
      },
    });
  }

  async findAll() {
    return this.databaseService.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: {
        id,
      },
    });

    if (!expense) {
      throw new NotFoundException(
        `Unable to find expense with ID of ${id.toString()}`,
      );
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);

    const tripId = updateExpenseDto.tripId ?? expense.tripId;

    if (updateExpenseDto.tripId) {
      await this.ensureTripExists(updateExpenseDto.tripId);
    }

    const participantId =
      updateExpenseDto.participantId ?? expense.participantId ?? undefined;

    if (
      (updateExpenseDto.tripId ?? updateExpenseDto.participantId) &&
      participantId
    ) {
      await this.ensureBuyerBelongsToTrip(participantId, tripId);
    }

    return this.databaseService.expense.update({
      where: {
        id,
      },
      data: {
        ...updateExpenseDto,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: {
        id,
      },
    });
  }
}
