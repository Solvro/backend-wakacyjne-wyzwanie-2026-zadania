import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.trip.findMany({
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        participants: true,
        expenses: {
          include: { paidBy: true },
        },
      },
    });

    if (!trip) {
      throw new NotFoundException(`Wycieczka o ID ${id} nie istnieje`);
    }

    return trip;
  }

  create(dto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        title: dto.title,
        category: dto.category,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        description: dto.description,
      },
    });
  }

  async update(id: number, dto: UpdateTripDto) {
    await this.findOne(id); 

    return this.prisma.trip.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.category && { category: dto.category }),
        ...(dto.startDate && { startDate: new Date(dto.startDate) }),
        ...(dto.endDate !== undefined && {
          endDate: dto.endDate ? new Date(dto.endDate) : null,
        }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); 

    return this.prisma.trip.delete({
      where: { id },
    });
  }
}
