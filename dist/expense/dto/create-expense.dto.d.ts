import { ExpenseCategory } from '@prisma/client';
export declare class CreateExpenseDto {
    title: string;
    amount: number;
    category: ExpenseCategory;
    tripId: number;
    payerId: number;
}
