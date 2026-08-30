import { IsString, IsNumber, IsEnum, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '@prisma/client';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Group Dinner' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 145.50 })
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.FOOD })
  @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

  @ApiProperty({ example: 1 })
  @IsInt()
  tripId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  payerId!: number;
}