import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TripService {
  constructor(private databaseService: DatabaseService) {}

  private async ensureTitleNotTaken(title: string, excludeTripId?: number) {
    const existing = await this.databaseService.trip.findUnique({
      where: { title },
    });

    if (existing && existing.id !== excludeTripId) {
      throw new ConflictException(`A trip titled "${title}" already exists`);
    }
  }

  private ensureDateRangeValid(startDate: Date, endDate: Date) {
    if (endDate <= startDate) {
      throw new BadRequestException('endDate must be after startDate');
    }
  }

  async create(createTripDto: CreateTripDto) {
    await this.ensureTitleNotTaken(createTripDto.title);
    this.ensureDateRangeValid(createTripDto.startDate, createTripDto.endDate);

    return this.databaseService.trip.create({
      data: {
        ...createTripDto,
      },
    });
  }

  async findAll() {
    return this.databaseService.trip.findMany();
  }

  async findOne(id: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: {
        id,
      },
    });

    if (!trip) {
      throw new NotFoundException(
        `Unable to find trip with ID of ${id.toString()}`,
      );
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const trip = await this.findOne(id);

    if (updateTripDto.title) {
      await this.ensureTitleNotTaken(updateTripDto.title, id);
    }

    const startDate = updateTripDto.startDate ?? trip.startDate;
    const endDate = updateTripDto.endDate ?? trip.endDate;

    if (updateTripDto.startDate ?? updateTripDto.endDate) {
      this.ensureDateRangeValid(startDate, endDate);
    }

    return this.databaseService.trip.update({
      where: {
        id,
      },
      data: {
        ...updateTripDto,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const [participantCount, expenseCount] = await Promise.all([
      this.databaseService.participant.count({ where: { tripId: id } }),
      this.databaseService.expense.count({ where: { tripId: id } }),
    ]);

    if (participantCount > 0 || expenseCount > 0) {
      throw new ConflictException(
        'Cannot delete a trip that still has participants or expenses',
      );
    }

    return this.databaseService.trip.delete({
      where: {
        id,
      },
    });
  }
}
