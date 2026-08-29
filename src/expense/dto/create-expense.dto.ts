import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ExpenseCategory } from '../../../generated/prisma/client';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'ID of the associated trip',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  tripId: number;

  @ApiProperty({
    description: 'ID of the participant who paid',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  participantId: number;

  @ApiProperty({
    description: 'Title / name of the expense',
    example: 'Obiad',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Amount of the expense',
    example: 89.99,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    enum: ExpenseCategory,
    enumName: 'ExpenseCategory',
    description: 'Category of the expense',
    example: ExpenseCategory.FOOD,
  })
  @IsEnum(ExpenseCategory)
  @IsNotEmpty()
  category: ExpenseCategory;

  @ApiProperty({
    description: 'Detailed description of the expense',
    example: 'Restauracja przy plaży',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Date when the expense was created (ISO 8601 string)',
    example: '2026-07-10T14:30:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;
}
