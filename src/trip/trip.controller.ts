import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Type } from '@prisma/client';

@Controller('trips')
export class TripController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getAllTrips() {
    return this.prisma.trip.findMany({
      include: { participants: true, expenses: true },
    });
  }

  @Post()
  createTrip(@Body() body: { start: string; end?: string; type: Type }) {
    return this.prisma.trip.create({
      data: {
        start: new Date(body.start),
        end: body.end ? new Date(body.end) : null,
        type: body.type,
      },
    });
  }
}
