import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('trips')
export class TripsController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getAllTrips() {
    return this.prisma.trip.findMany({
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  @Post()
  async createTrip(@Body() body: { destination: string; startDate: string }) {
    return this.prisma.trip.create({
      data: {
        destination: body.destination,
        startDate: new Date(body.startDate),
      },
    });
  }
}