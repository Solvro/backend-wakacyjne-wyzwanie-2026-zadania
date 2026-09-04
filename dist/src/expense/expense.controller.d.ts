import { ExpensesService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(dto: CreateExpenseDto): import(".prisma/client").Prisma.Prisma__ExpenseClient<{
        amount: number;
        description: string;
        date: Date;
        id: number;
        tripId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        amount: number;
        description: string;
        date: Date;
        id: number;
        tripId: number;
    }[]>;
    findOne(id: number): Promise<{
        amount: number;
        description: string;
        date: Date;
        id: number;
        tripId: number;
    }>;
    update(id: number, dto: UpdateExpenseDto): Promise<{
        amount: number;
        description: string;
        date: Date;
        id: number;
        tripId: number;
    }>;
    remove(id: number): Promise<{
        amount: number;
        description: string;
        date: Date;
        id: number;
        tripId: number;
    }>;
}
