import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('trips')
export class TripsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getTrips() {
    return this.prisma.trip.findMany({ 
      include: { expenses: true, participants: true } 
    });
  }

  @Post()
  createTrip(@Body() data: { destination: string; startDate: string }) {
    return this.prisma.trip.create({
      data: {
        destination: data.destination,
        startDate: new Date(data.startDate),
      },
    });
  }
}