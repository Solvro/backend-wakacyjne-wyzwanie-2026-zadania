import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({ 
      data: {
        ...createTripDto,
        start_date: new Date(createTripDto.start_date)
      } 
    });
  }

  findAll() {
    return this.prisma.trip.findMany();
  }

  findOne(id: number) {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    const dataToUpdate: any = { ...updateTripDto };
    if (updateTripDto.start_date) {
      dataToUpdate.start_date = new Date(updateTripDto.start_date);
    }
    
    return this.prisma.trip.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  remove(id: number) {
    return this.prisma.trip.delete({ where: { id } });
  }
}
