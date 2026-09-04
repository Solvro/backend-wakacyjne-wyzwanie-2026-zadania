import { DatabaseService } from '../prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findAll(userId: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    create(userId: number, createTripDto: CreateTripDto): import("@prisma/client").Prisma.Prisma__TripClient<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOne(userId: number, id: number): Promise<{
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
    update(userId: number, id: number, updateTripDto: UpdateTripDto): Promise<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    }>;
    remove(userId: number, id: number): Promise<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
        userId: number | null;
    }>;
}
