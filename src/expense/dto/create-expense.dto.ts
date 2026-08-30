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
  tripId!: number;

  @IsInt({ message: 'Payer ID must be an integer' })
  @IsNotEmpty({ message: 'Payer ID is required' })
  payerId!: number;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount!: number;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsDateString({}, { message: 'Expense date must be a valid date string' })
  @IsNotEmpty({ message: 'Expense date is required' })
  expenseDate!: string;
}
