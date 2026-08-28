import { TripsService } from './trips/trips.service';
import { CreateTripDto } from './trips/dto/create-trip.dto';
import { UpdateTripDto } from './trips/dto/update-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        expenses: {
            description: string | null;
            id: number;
            cost: number;
            date: Date;
            tripId: number;
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
    })[]>;
    create(createTripDto: CreateTripDto): import("@prisma/client").Prisma.Prisma__TripClient<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOne(id: number): Promise<{
        expenses: {
            description: string | null;
            id: number;
            cost: number;
            date: Date;
            tripId: number;
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
    }>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
    }>;
    remove(id: number): Promise<{
        destination: string;
        startDate: Date;
        endDate: Date | null;
        status: import("@prisma/client").$Enums.TripStatus;
        id: number;
    }>;
}
