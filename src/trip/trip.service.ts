import { Injectable } from '@nestjs/common';
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
        startDate: createTripDto.startDate,
        endDate: createTripDto.endDate,
        status: createTripDto.status,
      },
    });
  }

  findAll() {
    return `This action returns all trip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trip`;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
