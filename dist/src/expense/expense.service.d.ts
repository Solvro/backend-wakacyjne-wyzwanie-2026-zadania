import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateExpenseDto): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        id: number;
        tripId: number;
        amount: number;
        description: string;
        date: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        tripId: number;
        amount: number;
        description: string;
        date: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        tripId: number;
        amount: number;
        description: string;
        date: Date;
    }>;
    update(id: number, dto: UpdateExpenseDto): Promise<{
        id: number;
        tripId: number;
        amount: number;
        description: string;
        date: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        tripId: number;
        amount: number;
        description: string;
        date: Date;
    }>;
}
