import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import {DatabaseService} from '../database/database.service'
import {Trip} from './entities/trip.entity'


@Injectable()
export class TripService {

  constructor(private databaseService: DatabaseService) {};

  async create(createTripDto: CreateTripDto): Promise<Trip>{

    return this.databaseService.trip.create({
      data: {
        city: createTripDto.city,
        food: createTripDto.food,
        participants: {
          connect: createTripDto.participantsId && createTripDto.participantsId.map( id => ({id}))
        }
      }
    });
  }

  async findAll() {
    return this.databaseService.trip.findMany({
      include: {
        expenses: true,
        participants: true,
      }
    });
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.databaseService.trip.findUnique({
      where:{id},
      include: {
        expenses: true,
        participants: true,
      }
    });

    if(! trip){
      throw new NotFoundException(`Trip with id ${id} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {

    await this.findOne(id);

    return this.databaseService.trip.update({
      where: {id},
      data: {
        city: updateTripDto.city,
        food: updateTripDto.food,
        participants: {
          connect: updateTripDto.participantsId && updateTripDto.participantsId.map( id => ({id}))
        }
      }
    });
  }

  async remove(id: number): Promise<Trip> {

    await this.findOne(id);

    return this.databaseService.trip.delete({
      where: {id}
    });
  }
}

