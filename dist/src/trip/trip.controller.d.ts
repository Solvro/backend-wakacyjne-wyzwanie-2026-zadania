import { TripsService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: CreateTripDto): import(".prisma/client").Prisma.Prisma__TripClient<{
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
        id: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        expenses: {
            id: number;
            amount: number;
            description: string;
            date: Date;
            tripId: number;
        }[];
        participants: {
            name: string;
            id: number;
            tripId: number;
            email: string;
            phone: string | null;
        }[];
    } & {
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        expenses: {
            id: number;
            amount: number;
            description: string;
            date: Date;
            tripId: number;
        }[];
        participants: {
            name: string;
            id: number;
            tripId: number;
            email: string;
            phone: string | null;
        }[];
    } & {
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
        id: number;
    }>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
        id: number;
    }>;
}
