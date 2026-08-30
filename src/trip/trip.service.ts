import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TripService {
  constructor(private readonly prisma: DatabaseService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: createTripDto,
    });
  }

  findAll() {
    return this.prisma.trip.findMany();
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found.`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);

    return this.prisma.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.trip.delete({
      where: { id },
    });
  }
}
