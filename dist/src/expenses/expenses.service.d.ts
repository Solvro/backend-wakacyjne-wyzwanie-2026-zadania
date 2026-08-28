import { DatabaseService } from '../prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        trip: {
            id: number;
            destination: string;
            startDate: Date;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.TripStatus;
        };
        participant: {
            tripId: number;
            id: number;
            name: string;
        };
    } & {
        description: string | null;
        cost: number;
        date: Date;
        tripId: number;
        participantId: number;
        id: number;
    })[]>;
    create(createExpenseDto: CreateExpenseDto): import("@prisma/client").Prisma.Prisma__ExpenseClient<{
        description: string | null;
        cost: number;
        date: Date;
        tripId: number;
        participantId: number;
        id: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOne(id: number): Promise<{
        trip: {
            id: number;
            destination: string;
            startDate: Date;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.TripStatus;
        };
        participant: {
            tripId: number;
            id: number;
            name: string;
        };
    } & {
        description: string | null;
        cost: number;
        date: Date;
        tripId: number;
        participantId: number;
        id: number;
    }>;
    update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<{
        description: string | null;
        cost: number;
        date: Date;
        tripId: number;
        participantId: number;
        id: number;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        cost: number;
        date: Date;
        tripId: number;
        participantId: number;
        id: number;
    }>;
}
