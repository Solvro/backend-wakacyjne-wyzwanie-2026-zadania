import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class TripService {
  constructor(private databaseService: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    return this.databaseService.trip.create({
      data: {
        destination: createTripDto.destination,
        date_start: createTripDto.startDate,
        date_end: createTripDto.endDate
      }
    });
  }

  async findAll() {
    return this.databaseService.trip.findMany();
  }

 async findOne(id: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: {
        id
      }
    })
    
    if(!trip) {
      throw new NotFoundException("No trip found with the given ID")
    };
  }

  async update(id: number, UpdateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.databaseService.trip.update({
      where: {
        id
      },
      data: {
        destination: UpdateTripDto.destination,
        date_start: UpdateTripDto.startDate,
        date_end: UpdateTripDto.endDate
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.trip.delete({
      where: {
        id
      }
    })
  }
}
