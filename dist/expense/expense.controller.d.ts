import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(createExpenseDto: CreateExpenseDto): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        title: string;
        id: number;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        payerId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        trip: {
            title: string;
            budget: number;
            startDate: Date;
            endDate: Date | null;
            id: number;
        };
        paidBy: {
            id: number;
            name: string;
            email: string;
            tripId: number;
        };
    } & {
        title: string;
        id: number;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        payerId: number;
    })[]>;
    findOne(id: string): Promise<{
        title: string;
        id: number;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        payerId: number;
    }>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<{
        title: string;
        id: number;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        payerId: number;
    }>;
    remove(id: string): Promise<{
        title: string;
        id: number;
        tripId: number;
        amount: number;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        createdAt: Date;
        payerId: number;
    }>;
}
