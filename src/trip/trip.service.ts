import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTripDto } from './dto/create-trip.dto.js';
import { UpdateTripDto } from './dto/update-trip.dto.js';

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        Location: createTripDto.Location,
        Begin_date: new Date(createTripDto.Begin_date),
        End_date: createTripDto.End_date ? new Date(createTripDto.End_date) : undefined,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.trip.findMany({ skip, take: limit }),
      this.prisma.trip.count(),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { Trip_id: id },
    });

    if (!trip) {
      throw new NotFoundException(`Wycieczka o id ${id} nie istnieje`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);

    return this.prisma.trip.update({
      where: { Trip_id: id },
      data: {
        Location: updateTripDto.Location,
        Begin_date: updateTripDto.Begin_date ? new Date(updateTripDto.Begin_date) : undefined,
        End_date: updateTripDto.End_date ? new Date(updateTripDto.End_date) : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.trip.delete({
      where: { Trip_id: id },
    });
  }
}