import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpenseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createExpenseDto: CreateExpenseDto): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        title: string;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        id: number;
        tripId: number;
        payerId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        trip: {
            title: string;
            id: number;
            budget: number;
            startDate: Date;
            endDate: Date | null;
        };
        paidBy: {
            id: number;
            tripId: number;
            name: string;
            email: string;
        };
    } & {
        title: string;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        id: number;
        tripId: number;
        payerId: number;
    })[]>;
    findOne(id: number): Promise<{
        title: string;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        id: number;
        tripId: number;
        payerId: number;
    }>;
    update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<{
        title: string;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        id: number;
        tripId: number;
        payerId: number;
    }>;
    remove(id: number): Promise<{
        title: string;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        id: number;
        tripId: number;
        payerId: number;
    }>;
}
