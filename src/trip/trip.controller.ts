import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TripStatus } from '@prisma/client';

@Controller('trips')
export class TripController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.trip.findMany({
      include: { participants: true, expenses: true },
    });
  }

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      destination: string;
      startDate: string;
      endDate: string;
      budget: number;
      status: TripStatus;
      notes?: string;
    },
  ) {
    return this.prisma.trip.create({
      data: {
        ...body,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      },
    });
  }
}
