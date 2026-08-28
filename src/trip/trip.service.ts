import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TripService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async create(createTripDto: CreateTripDto){
    return this.dataBaseService.trip.create({ 
      data: {
        name: createTripDto.name,
        startDate: createTripDto.startDate,
        endDate: createTripDto.endDate,
        description: createTripDto.description
      } 
    });
  }

  async findAll() {
    return this.dataBaseService.trip.findMany();
  }

  async findOne(id: number) {
    const trip = this.dataBaseService.trip.findUnique({
      where: { id: id },
    });

    if (!trip) {
      throw new Error(`Trip with ID ${id} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.dataBaseService.trip.update({
      where: { id: id },
      data: {
        name: updateTripDto.name,
        startDate: updateTripDto.startDate,
        endDate: updateTripDto.endDate,
        description: updateTripDto.description
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.dataBaseService.trip.delete({
      where: { id: id },
    });
  }
}
