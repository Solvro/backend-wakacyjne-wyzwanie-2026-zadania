import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller("api/trips")
export class AppController {
  private readonly db = new PrismaClient();

  @Get()
  async getAllTrips() {
    return this.db.trip.findMany({
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  @Patch(':id')
  async updateTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      name?: string;
      start_date?: string;
      end_date?: string;
      description?: string;
    },
  ) {
    return this.db.trip.update({
      where: { id },
      data: {
        ...data,
        ...(data.start_date && { start_date: new Date(data.start_date) }),
        ...(data.end_date && { end_date: new Date(data.end_date) }),
      },
    });
  }  
}
