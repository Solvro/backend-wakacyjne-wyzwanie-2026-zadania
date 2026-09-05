import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({ data: createTripDto });
  }

  findAll() {
    return this.prisma.trip.findMany();
  }

  findOne(id: number) {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({ where: { id }, data: updateTripDto });
  }

  remove(id: number) {
    return this.prisma.trip.delete({ where: { id } });
  }
}