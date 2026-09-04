import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        ...createTripDto,
        startDate: new Date(createTripDto.startDate),
        endDate: createTripDto.endDate ? new Date(createTripDto.endDate) : null,
      },
    });
  }

  findAll() {
    return this.prisma.trip.findMany({
      include: { participants: true, expenses: true },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: { participants: true, expenses: true },
    });
    if (!trip) throw new NotFoundException(`Trip with ID ${id} not found`);
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.prisma.trip.update({
      where: { id },
      data: {
        ...updateTripDto,
        startDate: updateTripDto.startDate ? new Date(updateTripDto.startDate) : undefined,
        endDate: updateTripDto.endDate ? new Date(updateTripDto.endDate) : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.trip.delete({ where: { id } });
  }
}