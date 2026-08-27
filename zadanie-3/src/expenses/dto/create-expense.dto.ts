import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { ExpenseStatus } from '../enum/expense-status.enum';

export class CreateExpenseDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title!: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be greater than zero' })
  amount!: number;

  @IsOptional()
  @IsString({ message: 'Currency must be a string' })
  @Length(3, 3, {
    message: 'Currency must be a 3-letter code (e.g., PLN, EUR)',
  })
  currency?: string = 'PLN';

  @IsOptional()
  @IsEnum(ExpenseStatus, { message: 'Invalid expense status' })
  status?: ExpenseStatus = ExpenseStatus.PAID;

  @IsUUID('all', { message: 'Payer UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'Payer UUID is required' })
  payerUuid!: string;

  @IsUUID('all', { message: 'Trip UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'Trip UUID is required' })
  tripUuid!: string;
}
