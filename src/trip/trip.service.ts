import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TripService {
  constructor(private prismaService: PrismaService) {};

  async create(createTripDto: CreateTripDto) {
    return this.prismaService.trip.create({
      data: {
        name: createTripDto.name,  
        startDate: createTripDto.startDate,
        endDate: createTripDto.endDate, 
        status: createTripDto.status,   
      }
    });
  }

  async findAll() {
    return this.prismaService.trip.findMany();
  }

  async findOne(id: number) {
    const value = await this.prismaService.trip.findUnique({
      where: {id}
    })

    if (!value){
      throw new NotFoundException("No trip with this id found in DB");
    }

    return value
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id)
    return this.prismaService.trip.update({
      where: {id},
      data: {
        name: updateTripDto.name,  
        startDate: updateTripDto.startDate,
        endDate: updateTripDto.endDate, 
        status: updateTripDto.status,   
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.trip.delete({
      where: {id}
    });
  }
}
