import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        title: createTripDto.title,
        start_date: new Date(createTripDto.start_date),
        end_date: new Date(createTripDto.end_date),
        description: createTripDto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        expenses: true,
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        expenses: true,
      },
    });
    if (!trip) {
      throw new NotFoundException(`Wycieczka o ID ${id} nie została znaleziona`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.prisma.trip.update({
      where: { id },
      data: {
        ...(updateTripDto.title !== undefined && { title: updateTripDto.title }),
        ...(updateTripDto.start_date !== undefined && {
          start_date: new Date(updateTripDto.start_date),
        }),
        ...(updateTripDto.end_date !== undefined && {
          end_date: new Date(updateTripDto.end_date),
        }),
        ...(updateTripDto.description !== undefined && {
          description: updateTripDto.description,
        }),
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
