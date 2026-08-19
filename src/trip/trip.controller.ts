import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Status } from '@prisma/client';

@Controller('trips')
export class TripController {
    constructor(private prisma: PrismaService){}

    @Get()
    async getAllTTrips() {
        return this.prisma.trip.findMany({
            include: {
                Participants: {
                    include: {
                        Participant: true,
                        Expenses: true
                    }
                }
            }
        })
    }

    @Post()
    async createTrip(@Body() body: { name: string; startDate: string; endDate?: string }) {
    return this.prisma.trip.create({
      data: {
        Name: body.name,
        StartDate: new Date(body.startDate),
        EndDate: body.endDate ? new Date(body.endDate) : null,
        Status: Status.PLANNING,
      },
    });
  }
}
