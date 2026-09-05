import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({ data: createTripDto });
  }

  findAll() {
    return this.prisma.trip.findMany();
  }

  findOne(id: number) {
    const trip = this.prisma.trip.findUnique({ where: { id } });

    if(!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return await this.prisma.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.trip.delete({
      where: { id },
    });
  }
}
