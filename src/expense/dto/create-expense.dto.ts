import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '@prisma/client';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsEnum, IsDateString, IsInt } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Flight tickets' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1200 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.TRANSPORT })
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @ApiProperty({ example: '2026-06-15' })
  @IsDateString()
  datetime: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  tripId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  paidById: number;
}
