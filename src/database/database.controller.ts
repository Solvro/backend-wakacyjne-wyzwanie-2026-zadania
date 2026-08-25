import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('trips')
export class DatabaseController {
  constructor(private readonly prisma: DatabaseService) {}

  @Get()
  async getTrips() {
    return this.prisma.trip.findMany({
      include: {
        expenses: true,
        participants: true,
      },
    });
  }

  @Post()
  async createTrip(
    @Body() body: { name: string; startDate: string; description?: string },
  ) {
    return this.prisma.trip.create({
      data: {
        name: body.name,
        startDate: new Date(body.startDate),
        description: body.description,
      },
    });
  }
}
