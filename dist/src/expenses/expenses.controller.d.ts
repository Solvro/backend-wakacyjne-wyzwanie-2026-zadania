import { Request } from 'express';
import { AuthenticatedUser } from '../auth/jwt.strategy';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    findAll(request: Request & {
        user: AuthenticatedUser;
    }): import("@prisma/client").Prisma.PrismaPromise<({
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
    create(request: Request & {
        user: AuthenticatedUser;
    }, createExpenseDto: CreateExpenseDto): Promise<{
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    }>;
    findOne(request: Request & {
        user: AuthenticatedUser;
    }, id: number): Promise<{
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
    update(request: Request & {
        user: AuthenticatedUser;
    }, id: number, updateExpenseDto: UpdateExpenseDto): Promise<{
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    }>;
    remove(request: Request & {
        user: AuthenticatedUser;
    }, id: number): Promise<{
        id: number;
        tripId: number;
        cost: number;
        description: string | null;
        date: Date;
        participantId: number;
    }>;
}
