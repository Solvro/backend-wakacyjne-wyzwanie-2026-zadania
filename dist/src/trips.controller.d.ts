import { Request } from 'express';
import { AuthenticatedUser } from './auth/jwt.strategy';
import { TripsService } from './trips/trips.service';
import { CreateTripDto } from './trips/dto/create-trip.dto';
import { UpdateTripDto } from './trips/dto/update-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    findAll(request: Request & {
        user: AuthenticatedUser;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        expenses: {
            id: number;
            tripId: number;
            cost: number;
            description: string | null;
            date: Date;
            participantId: number;
        }[];
        participants: {
            id: number;
            name: string;
            tripId: number;
        }[];
    } & {
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    })[]>;
    create(request: Request & {
        user: AuthenticatedUser;
    }, createTripDto: CreateTripDto): import("@prisma/client").Prisma.Prisma__TripClient<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOne(request: Request & {
        user: AuthenticatedUser;
    }, id: number): Promise<{
        expenses: {
            id: number;
            tripId: number;
            cost: number;
            description: string | null;
            date: Date;
            participantId: number;
        }[];
        participants: {
            id: number;
            name: string;
            tripId: number;
        }[];
    } & {
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    }>;
    update(request: Request & {
        user: AuthenticatedUser;
    }, id: number, updateTripDto: UpdateTripDto): Promise<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    }>;
    remove(request: Request & {
        user: AuthenticatedUser;
    }, id: number): Promise<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    }>;
}
