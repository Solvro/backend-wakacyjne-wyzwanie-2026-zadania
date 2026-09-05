import { ExpenseCategory } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min, IsString, IsEnum } from "class-validator";


export class CreateExpenseDto {
    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @ApiProperty({
        description: "A description of the expense",
        example: "Payment for the night at the XYZ hotel."
    })
    description!: string;

    @IsInt({ message: "must be an integer" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @Min(0)
    @ApiProperty({
        description: "The price of the expense",
        example: "200"
    })
    price!: number;

    @IsEnum(ExpenseCategory)
    @IsNotEmpty({ message: "the field can't be empty" })
    @ApiProperty({
        enum: ExpenseCategory,
        enumName: 'ExpenseCategory',
        description: "Expense category",
        example: ExpenseCategory.ACCOMMODATION
    })
    category!: ExpenseCategory;

    @IsInt({ message: "must be an integer" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @ApiProperty({
        description: "Trip ID to which the expense belongs",
        example: "2"
    })
    tripId!: number;
}
