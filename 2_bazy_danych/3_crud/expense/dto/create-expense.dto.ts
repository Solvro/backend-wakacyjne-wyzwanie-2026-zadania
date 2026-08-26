import { Category } from '@prisma/client';

export class CreateExpenseDto {
    trip_id!: number;
    payer_id!: number;
    amount!: number;
    category!: Category;
    description!: string;
    created_at!: Date;
}
