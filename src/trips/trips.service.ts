import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.trip.findMany({
      include: { expenses: true, participants: true },
    });
  }

  create(createTripDto: CreateTripDto) {
    return this.databaseService.trip.create({
      data: {
        destination: createTripDto.destination,
        startDate: new Date(createTripDto.startDate),
        endDate: createTripDto.endDate ? new Date(createTripDto.endDate) : undefined,
        status: createTripDto.status,
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: { id },
      include: { expenses: true, participants: true },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);

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

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.trip.delete({ where: { id } });
  }
}