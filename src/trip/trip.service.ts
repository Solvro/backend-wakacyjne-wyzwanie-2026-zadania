import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from 'src/database/database.service';
import { Trip } from 'src/generated/prisma/client';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Injectable()
export class TripService {
  constructor(private databaseService: DatabaseService) { }

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return this.databaseService.trip.create({
      data: {
        name: createTripDto.name,
        destination: createTripDto.destination,
        startDate: createTripDto.startDate,
        endDate: createTripDto.endDate,
        budget: createTripDto.budget,
      }
    });
  }

  async findAll(query: PaginationDto) {
    return this.databaseService.trip.findMany({
      skip: query.offset,
      take: query.limit
    });
  }

  async findOne(id: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: {
        id
      }
    })
    if (!trip) {
      throw new NotFoundException("No trip with this id found in DB")
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.databaseService.trip.update({
      where: { id },
      data: {
        name: updateTripDto.name,
        destination: updateTripDto.destination,
        startDate: updateTripDto.startDate,
        endDate: updateTripDto.endDate,
        budget: updateTripDto.budget
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.trip.delete({
      where: { id }
    })
  }
}
