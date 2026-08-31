import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripService {

  constructor(private readonly prisma: PrismaService){}


  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: createTripDto,
    });
  }

  findAll() {
    return this.prisma.trip.findMany();
  }

  findOne(id: number) {
    return this.prisma.trip.findUnique({
      where : {id},
    });
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({
      where: {id},
      data: updateTripDto,
    });
  }
 
  remove(id: number) {
    return this.prisma.trip.delete({
      where:{id},
    });
  }
}
