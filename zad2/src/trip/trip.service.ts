import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from 'database/database.service';

@Injectable()
export class TripService {

  constructor(private dataBaseService: DatabaseService){}

  async create(createTripDto: CreateTripDto) {
    return this.dataBaseService.trip.create({
      data:{
        trip_start_date: createTripDto.trip_start_date,
        trip_end_date: createTripDto.trip_end_date,
        cost: createTripDto.cost,
        num_spots: createTripDto.num_spots,
      }
    })
  }

  async findAll() {
    return this.dataBaseService.trip.findMany();
  }

  async findOne(id: number) {
    const trip = await this.dataBaseService.trip.findUnique({
      where: {id}
    });

    if(!trip){
      throw new NotFoundException(`Trip with id ${id} not found`);
    }

    return trip;
  }


  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.dataBaseService.trip.update({
      where: {id},
      data:{
        trip_start_date: updateTripDto.trip_start_date,
        trip_end_date: updateTripDto.trip_end_date,
        cost: updateTripDto.cost,
        num_spots: updateTripDto.num_spots,
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.dataBaseService.trip.delete({
      where: {id}
    });
  }
}
