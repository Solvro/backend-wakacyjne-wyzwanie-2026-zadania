import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import type { DatabaseService } from '../database/database.service';

@Injectable()
export class TripsService {
  constructor(private databaseService: DatabaseService) {}
  
  create(createTripDto: CreateTripDto) {
    return this.databaseService.trip.create({
      data: {
        id: createTripDto.id,
        name: createTripDto.name,
        description: createTripDto.description,
        start_time: createTripDto.start_time,
        end_time: createTripDto.end_time
      }
    });
  }

  findAll() {
    return this.databaseService.trip.findMany();
  }

  findOne(id: number) {
    return this.databaseService.trip.findFirst({
      where: { id }
    });
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.databaseService.trip.update({
      where: { id },
      data: {
        name: updateTripDto.name,
        description: updateTripDto.description,
        start_time: updateTripDto.start_time,
        end_time: updateTripDto.end_time
      }
    });
  }

  remove(id: number) {
    return this.databaseService.trip.delete({
      where: { id }
    });
  }
}
