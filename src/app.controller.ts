import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller("api/trips")
export class AppController {
  constructor(private readonly db: DatabaseService) {}

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
