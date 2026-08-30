import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @IsInt({ message: 'Trip ID must be an integer' })
  @IsOptional()
  tripId?: number;

  @IsInt({ message: 'Payer ID must be an integer' })
  @IsOptional()
  payerId?: number;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsOptional()
  amount?: number;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsDateString({}, { message: 'Expense date must be a valid date string' })
  @IsOptional()
  expenseDate?: string;
}
