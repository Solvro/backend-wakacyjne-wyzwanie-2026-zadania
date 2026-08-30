import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from 'src/database/database.service';
import { Trip } from 'generated/prisma/client';

@Injectable()
export class TripService {
  constructor(private databaseService: DatabaseService) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return this.databaseService.trip.create({
      data: {
        title: createTripDto.title,
        startDate: new Date(createTripDto.startDate),
        endDate: createTripDto.endDate ? new Date(createTripDto.endDate) : null,
        status: createTripDto.status,
      },
    });
  }

  async findAll(): Promise<Trip[]> {
    return this.databaseService.trip.findMany();
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.databaseService.trip.findUnique({
      where: { id },
    });
    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    await this.findOne(id);
    return this.databaseService.trip.update({
      where: { id },
      data: {
        title: updateTripDto.title,
        startDate: updateTripDto.startDate
          ? new Date(updateTripDto.startDate)
          : undefined,
        endDate: updateTripDto.endDate
          ? new Date(updateTripDto.endDate)
          : undefined,
        status: updateTripDto.status,
      },
    });
  }

  async remove(id: number): Promise<Trip> {
    await this.findOne(id);
    return this.databaseService.trip.delete({
      where: { id },
    });
  }
}
