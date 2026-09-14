import { TripsService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: CreateTripDto): import(".prisma/client").Prisma.Prisma__TripClient<{
        name: string;
        id: number;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        expenses: {
            id: number;
            tripId: number;
            amount: number;
            description: string;
            date: Date;
        }[];
        participants: {
            name: string;
            email: string;
            phone: string | null;
            id: number;
            tripId: number;
        }[];
    } & {
        name: string;
        id: number;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    })[]>;
    findOne(id: number): Promise<{
        expenses: {
            id: number;
            tripId: number;
            amount: number;
            description: string;
            date: Date;
        }[];
        participants: {
            name: string;
            email: string;
            phone: string | null;
            id: number;
            tripId: number;
        }[];
    } & {
        name: string;
        id: number;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    }>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        name: string;
        id: number;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    }>;
}
