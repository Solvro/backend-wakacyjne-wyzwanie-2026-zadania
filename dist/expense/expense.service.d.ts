import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpenseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createExpenseDto: CreateExpenseDto): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        createdAt: Date;
        id: number;
        title: string;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        payerId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        trip: {
            id: number;
            title: string;
            budget: number;
            startDate: Date;
            endDate: Date | null;
        };
        paidBy: {
            email: string;
            id: number;
            name: string;
            tripId: number;
        };
    } & {
        createdAt: Date;
        id: number;
        title: string;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        payerId: number;
    })[]>;
    findOne(id: number): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        payerId: number;
    }>;
    update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        payerId: number;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        payerId: number;
    }>;
}
