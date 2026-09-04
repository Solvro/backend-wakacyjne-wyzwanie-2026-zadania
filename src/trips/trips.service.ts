import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(userId: number) {
    return this.databaseService.trip.findMany({
      where: { userId },
      include: { expenses: true, participants: true },
    });
  }

  create(userId: number, createTripDto: CreateTripDto) {
    return this.databaseService.trip.create({
      data: {
        destination: createTripDto.destination,
        startDate: new Date(createTripDto.startDate),
        endDate: createTripDto.endDate ? new Date(createTripDto.endDate) : undefined,
        status: createTripDto.status,
        userId,
      },
    });
  }

  async findOne(userId: number, id: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: { id, userId },
      include: { expenses: true, participants: true },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    return trip;
  }

  async update(userId: number, id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(userId, id);

    return this.databaseService.trip.update({
      where: { id },
      data: {
        destination: updateTripDto.destination,
        startDate: updateTripDto.startDate ? new Date(updateTripDto.startDate) : undefined,
        endDate: updateTripDto.endDate ? new Date(updateTripDto.endDate) : undefined,
        status: updateTripDto.status,
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.databaseService.trip.delete({ where: { id, userId } });
  }
}