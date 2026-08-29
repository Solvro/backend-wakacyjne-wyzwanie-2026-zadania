import 'dotenv/config';

import {Controller, Get, Post, Body} from '@nestjs/common';
import {DatabaseService} from '../database/database.service';
import {Trip} from '@prisma/client';
import {TripsService} from "./trips.service";

@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) {
    }

    @Get()
    async findAll(): Promise<Trip[]> {
        return this.tripsService.findAllTrips();
    }

    @Post()
    async create(@Body() data: { TripDate: string; Destination: string; Description?: string }): Promise<Trip> {
        return this.tripsService.createTrip(data);
    }
}