import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsInt, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsPositive, isString, IsString, MaxLength } from 'class-validator';
import { ExpenseCategory } from "src/generated/prisma/enums";


export class CreateExpenseDto {
    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "can't be empty" })
    @MaxLength(70)
    @ApiProperty({
        description: "Title of expense",
        example: "Nocleg"
    })
    title!: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: "Amount of expense in zl",
        example: "450.5"
    })
    amount!: number;


    @ApiProperty({
        enum: ExpenseCategory,
        description: "Expense category",
        example: ExpenseCategory.ACCOMMODATION
    })
    @IsEnum(ExpenseCategory,
        {
            message: `category must be one of: ${Object.values(ExpenseCategory).join(', ')}`,
        })
    @IsNotEmpty({ message: " must not be empty" })
    category!: ExpenseCategory;

    @IsOptional()
    @IsDateString({}, { message: 'must be a valid date (YYYY-MM-DD)' })
    @ApiPropertyOptional({
        description: "Creation of expense date",
        example: "2026-05-01T00:00:00.000Z"
    })
    createdAt?: string;

    @IsOptional()
    @IsString({ message: "must be a string" })
    @MaxLength(500)
    note?: string;

    @IsInt({ message: 'must be an integer' })
    @ApiProperty({
        description: "Identifying number of a trip",
        example: "1"
    })
    tripId!: number;

    @IsInt({ message: 'must be an integer' })
    @ApiProperty({
        description: "Identifying number of the payer",
        example: "1"
    })
    payerId!: number;
}
