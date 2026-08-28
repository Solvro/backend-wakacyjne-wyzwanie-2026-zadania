import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ExpenseCategory } from "src/generated/prisma/enums";

export class CreateExpenseResponseDto {
    @ApiProperty({ description: "The ID of the expense", example: 1 })
    id!: number;

    @ApiProperty({ description: "The title of the expense", example: 'Nocleg' })
    title!: string;

    @ApiProperty({ description: "The amount of the expense in zl", example: '450.5' })
    amount!: number;

    @ApiProperty({ description: "The category of the expense", example: ExpenseCategory.ACCOMMODATION })
    category!: ExpenseCategory;

    @ApiPropertyOptional({ description: "The date of creation of the expense", example: '2026-05-01T00:00:00.000Z' })
    createdAt?: string;

    @ApiProperty({ description: "The trip ID of the expense", example: 1 })
    tripId!: number;

    @ApiProperty({ description: "The payer ID of the expense", example: 1 })
    payerId!: number;
}