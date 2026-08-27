import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Status } from '@prisma/client';

export interface TripInput {
    name: string; 
    startDate: string; 
    endDate?: string;
}

@Injectable()
export class TripService{

    constructor(private readonly prisma: PrismaService) {}

    async getAllTrips() {
        return this.prisma.trip.findMany({
            include: {
                participants: {
                    include: {
                        participant: true,
                        expenses: true
                    }
                }
            }
        })
    }

    async createTrip(body: TripInput) {
        return this.prisma.trip.create({
          data: {
            name: body.name,
            startDate: new Date(body.startDate),
            endDate: body.endDate ? new Date(body.endDate) : null,
            status: Status.PLANNING,
          },
    });
}
}