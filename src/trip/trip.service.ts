// src/trips/trips.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTripDto) {
    return this.prisma.trip.create({
      data: { ...dto, startDate: new Date(dto.startDate) },
    });
  }

  findAll() {
    return this.prisma.trip.findMany({
      include: { expenses: true, participants: true },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: { expenses: true, participants: true },
    });
    if (!trip) throw new NotFoundException(`Trip with ID ${id} not found`);
    return trip;
  }

  async update(id: number, dto: UpdateTripDto) {
    await this.findOne(id);
    return this.prisma.trip.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.startDate && { startDate: new Date(dto.startDate) }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.trip.delete({ where: { id } });
  }
}