import { Controller, Get, Post, Body } from '@nestjs/common';
import { TripService } from './trip.service.js';
import type { TripInput } from './trip.service.js';


@Controller('trips')
export class TripController {
    constructor(private readonly tripService: TripService){}

    @Get()
    async getAllTrips() {
        return this.tripService.getAllTrips()
    }

    @Post()
    async createTrip(@Body() body: TripInput) {
        return this.tripService.createTrip(body)
    }
}
