import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({ data: createTripDto });
  }

  findAll() {
    return this.prisma.trip.findMany({
      include: { participants: true, expenses: true },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({ where: { trip_id: id } });
    if (!trip) {
      throw new NotFoundException();
    }
    return trip;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({
      where: { trip_id: id },
      data: updateTripDto,
    });
  }

  remove(id: number) {
    return this.prisma.trip.delete({ where: { trip_id: id } });
  }
}
