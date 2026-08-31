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
        location: createTripDto.location,
        start: new Date(createTripDto.start),
        end: new Date(createTripDto.end),
      },
    });
  }

  async findAll() {
    return this.databaseService.trip.findMany();
  }

  async findOne(id: number) {
   const trip = await this.databaseService.trip.findUnique({
         where: { trip_id: id }
       })
       if (!trip) {
         throw new NotFoundException("No trip with this id")
       }
       return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.databaseService.trip.update({
      where: { trip_id: id},
      data: {
        location: updateTripDto.location,
        start: updateTripDto.start ? new Date(updateTripDto.start) : undefined,
        end: updateTripDto.end ? new Date(updateTripDto.end) : undefined,
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.trip.delete({
      where: {trip_id : id}
    })
  }
}
