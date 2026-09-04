import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTripDto): import(".prisma/client").Prisma.Prisma__TripClient<{
        id: number;
        name: string;
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
            email: string;
            id: number;
            name: string;
            phone: string | null;
            tripId: number;
        }[];
    } & {
        id: number;
        name: string;
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
            email: string;
            id: number;
            name: string;
            phone: string | null;
            tripId: number;
        }[];
    } & {
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    }>;
    update(id: number, dto: UpdateTripDto): Promise<{
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.TripStatus;
        startDate: Date;
    }>;
}
