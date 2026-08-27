import { Exclude, Expose } from "class-transformer"
import { Category, Currency } from '../../../generated/prisma/client';

@Exclude()
export class ExpenseResponseDto {

    @Expose()
    amount!: number;

    @Expose()
    description!:string | null;

    @Expose()
    expenseDate!: string;

    @Expose()
    category!: Category;

    @Expose()
    currency!:Currency;

    @Expose()
    tripId!:number;

    @Expose()
    paidBy!:number;

}
