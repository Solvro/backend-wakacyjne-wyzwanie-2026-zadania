import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(private prisma: DatabaseService) {}
  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({ data: createTripDto });
  }

  findAll() {
    return this.prisma.trip.findMany({
      include: { participants: true, expenses: true },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { trip_id: id },
      include: { participants: true, expenses: true },
    });
    if (!trip) throw new NotFoundException(`Wycieczka o id ${id} nie istnieje`);
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.prisma.trip.update({
      where: { trip_id: id },
      data: updateTripDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.trip.delete({ where: { trip_id: id } });
  }
}
