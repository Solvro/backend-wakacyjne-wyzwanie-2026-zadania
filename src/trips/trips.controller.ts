import 'dotenv/config';

import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Trip } from '@prisma/client';

@Controller('trips')
export class TripsController {
    constructor(private readonly prisma: DatabaseService) {}

    @Get()
    async findAll(): Promise<Trip[]> {
        return this.prisma.trip.findMany({
            include: { Participants: true, Expenses: true }
        });
    }

    @Post()
    async create(@Body() data: { TripDate: string; Destination: string; Description?: string }): Promise<Trip> {
        return this.prisma.trip.create({
            data: {
                TripDate: new Date(data.TripDate),
                Destination: data.Destination,
                Description: data.Description,
            },
        });
    }
}