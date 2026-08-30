import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto): import(".prisma/client").Prisma.Prisma__TripClient<{
        title: string;
        id: number;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        participants: {
            id: number;
            tripId: number;
            name: string;
            email: string;
        }[];
        expenses: {
            title: string;
            amount: number;
            category: import(".prisma/client").$Enums.ExpenseCategory;
            createdAt: Date;
            id: number;
            tripId: number;
            payerId: number;
        }[];
    } & {
        title: string;
        id: number;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        participants: {
            id: number;
            tripId: number;
            name: string;
            email: string;
        }[];
        expenses: {
            title: string;
            amount: number;
            category: import(".prisma/client").$Enums.ExpenseCategory;
            createdAt: Date;
            id: number;
            tripId: number;
            payerId: number;
        }[];
    } & {
        title: string;
        id: number;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        title: string;
        id: number;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }>;
    remove(id: number): Promise<{
        title: string;
        id: number;
        budget: number;
        startDate: Date;
        endDate: Date | null;
    }>;
}
