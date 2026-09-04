import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto): import(".prisma/client").Prisma.Prisma__TripClient<{
        id: number;
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        participants: {
            email: string;
            id: number;
            name: string;
            tripId: number;
        }[];
        expenses: {
            createdAt: Date;
            id: number;
            title: string;
            tripId: number;
            amount: number;
            category: import(".prisma/client").$Enums.ExpenseCategory;
            payerId: number;
        }[];
    } & {
        id: number;
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        participants: {
            email: string;
            id: number;
            name: string;
            tripId: number;
        }[];
        expenses: {
            createdAt: Date;
            id: number;
            title: string;
            tripId: number;
            amount: number;
            category: import(".prisma/client").$Enums.ExpenseCategory;
            payerId: number;
        }[];
    } & {
        id: number;
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        id: number;
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }>;
}
