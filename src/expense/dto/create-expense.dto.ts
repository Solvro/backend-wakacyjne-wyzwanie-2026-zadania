import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsInt({ message: 'Trip ID must be an integer' })
  @IsNotEmpty({ message: 'Trip ID is required' })
  @ApiProperty({ description: 'The ID of the associated trip', example: 1 })
  tripId!: number;

  @IsInt({ message: 'Payer ID must be an integer' })
  @IsNotEmpty({ message: 'Payer ID is required' })
  @ApiProperty({
    description: 'The ID of the participant who paid',
    example: 1,
  })
  payerId!: number;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsNotEmpty({ message: 'Amount is required' })
  @ApiProperty({ description: 'The amount of the expense', example: 150.5 })
  amount!: number;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The description of the expense',
    example: 'Dinner at restaurant',
  })
  description?: string;

  @IsDateString({}, { message: 'Expense date must be a valid date string' })
  @IsNotEmpty({ message: 'Expense date is required' })
  @ApiProperty({
    description: 'The date when the expense occurred',
    example: '2026-07-05T12:00:00.000Z',
  })
  expenseDate!: string;
}
