import { DatabaseService } from '../prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findAll(userId: number): import("@prisma/client").Prisma.PrismaPromise<({
        trip: {
            destination: string;
            startDate: Date;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.TripStatus;
            id: number;
            userId: number | null;
        };
        participant: {
            id: number;
            name: string;
            tripId: number;
        };
    } & {
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    })[]>;
    create(userId: number, createExpenseDto: CreateExpenseDto): Promise<{
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    }>;
    findOne(userId: number, id: number): Promise<{
        trip: {
            destination: string;
            startDate: Date;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.TripStatus;
            id: number;
            userId: number | null;
        };
        participant: {
            id: number;
            name: string;
            tripId: number;
        };
    } & {
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    }>;
    update(userId: number, id: number, updateExpenseDto: UpdateExpenseDto): Promise<{
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    }>;
    remove(userId: number, id: number): Promise<{
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    }>;
    private validateRelations;
}
