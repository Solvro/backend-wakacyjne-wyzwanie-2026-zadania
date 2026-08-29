import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        ...createTripDto,
        startDate: new Date(createTripDto.startDate),
        endDate: new Date(createTripDto.endDate),
      },
    });
  }

  findAll(skip?: number, take?: number) {
    return this.prisma.trip.findMany({
      skip,
      take,
      include: { participants: true, expenses: true },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: { participants: true, expenses: true },
    });
    if (!trip) throw new NotFoundException(`Trip o id ${id} nie istnieje`);
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    const { startDate, endDate, ...rest } = updateTripDto;
    return this.prisma.trip.update({
      where: { id },
      data: {
        ...rest,
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.trip.delete({ where: { id } });
  }
}
