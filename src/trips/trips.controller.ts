import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // upewnij się, że ścieżka jest poprawna

@Controller('trips')
export class TripsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAllTrips() {
    return this.prisma.trip.findMany();
  }

  @Post()
  async createTrip(@Body() body: { destination: string; date_of_trip: string; price: number; type_of_trip: string }) {
    return this.prisma.trip.create({
      data: {
        destination: body.destination,
        date_of_trip: new Date(body.date_of_trip),
        price: body.price,
        type_of_trip: body.type_of_trip,
      },
    });
  }
}