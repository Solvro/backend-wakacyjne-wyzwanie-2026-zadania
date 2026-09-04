import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../database/database.service';

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService){}
  create(userId: number, createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data:{
      destination:createTripDto.destination,
      description: createTripDto.description,
      startDate: new Date(createTripDto.startDate),
      endDate: new Date (createTripDto.endDate),
      budget: createTripDto.budget,

      user:{
        connect:{
          id:userId
        }
      }
    },

    });
  }

  findAll(page:number, limit:number) {
    return this.prisma.trip.findMany({
      take:limit,
      skip:(page-1)*limit,
    });
  }

  findOne(id: number) {
    return this.prisma.trip.findUnique({
      where:{
        id,
      }
    })
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({
      where:{
        id,
      },
      data:{
      destination:updateTripDto.destination,
      description: updateTripDto.description,
      startDate: updateTripDto.startDate ? new Date(updateTripDto.startDate) : undefined,
      endDate:updateTripDto.endDate ? new Date(updateTripDto.endDate) : undefined,
      budget: updateTripDto.budget
      },
    });
  }

  remove(id: number) {
    return this.prisma.trip.delete({
      where:{
        id,
      },
    });
  }
}
