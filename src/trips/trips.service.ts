import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {Trip} from "@prisma/client";

@Injectable()

export class TripsService{
    constructor(private readonly prisma: DatabaseService){}

    async findAllTrips(): Promise<Trip[]>{
        return this.prisma.trip.findMany({
            include: {
                Participants: true,
                Expenses: true
            },
        });
    }

    async createTrip(data: {TripDate: string; Destination: string; Description?: string}): Promise<Trip>{
        return this.prisma.trip.create({
            data:{
                TripDate: new Date(data.TripDate),
                Destination: data.Destination,
                Description: data.Description
            },
        });
    }
}