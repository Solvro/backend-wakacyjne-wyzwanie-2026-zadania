import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    create(createTripDto: CreateTripDto): import(".prisma/client").Prisma.Prisma__TripClient<{
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
        id: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        participants: {
            id: number;
            name: string;
            email: string;
            tripId: number;
        }[];
        expenses: {
            title: string;
            id: number;
            tripId: number;
            amount: number;
            category: import(".prisma/client").$Enums.ExpenseCategory;
            createdAt: Date;
            payerId: number;
        }[];
    } & {
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        participants: {
            id: number;
            name: string;
            email: string;
            tripId: number;
        }[];
        expenses: {
            title: string;
            id: number;
            tripId: number;
            amount: number;
            category: import(".prisma/client").$Enums.ExpenseCategory;
            createdAt: Date;
            payerId: number;
        }[];
    } & {
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
        id: number;
    }>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
        id: number;
    }>;
    remove(id: number): Promise<{
        title: string;
        budget: number;
        startDate: Date;
        endDate: Date | null;
        id: number;
    }>;
}
