import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // sprawdź ścieżkę do swojego PrismaService
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({ data: createTripDto });
  }

  async findAll() {
    return this.prisma.trip.findMany({});
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { Trip_id: id },
    });
    if (!trip) throw new NotFoundException(`Wycieczka o ID ${id} nie istnieje`);
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id); // Sprawdzenie, czy wycieczka istnieje
    return this.prisma.trip.update({
      where: { Trip_id: id },
      data: updateTripDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Sprawdzenie, czy wycieczka istnieje
    return this.prisma.trip.delete({ where: { Trip_id: id } });
  }
}
