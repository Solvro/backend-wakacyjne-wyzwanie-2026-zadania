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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    example: 'Hotel stay in Warsaw',
    description: 'Title or name of the expense',
    maxLength: 100,
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title!: string;

  @ApiProperty({
    example: 150.5,
    description: 'Monetary amount of the expense (must be greater than zero)',
  })
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be greater than zero' })
  amount!: number;

  @ApiPropertyOptional({
    example: 'EUR',
    description: '3-letter currency code',
    default: 'PLN',
  })
  @IsOptional()
  @IsString({ message: 'Currency must be a string' })
  @Length(3, 3, {
    message: 'Currency must be a 3-letter code (e.g., PLN, EUR)',
  })
  currency?: string = 'PLN';

  @ApiPropertyOptional({
    enum: ExpenseStatus,
    example: ExpenseStatus.PAID,
    description: 'Current status of the expense',
    default: ExpenseStatus.PAID,
  })
  @IsOptional()
  @IsEnum(ExpenseStatus, { message: 'Invalid expense status' })
  status?: ExpenseStatus = ExpenseStatus.PAID;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description:
      'UUID of the participant who paid for the expense (Payer UUID)',
  })
  @ApiProperty()
  @IsUUID('all', { message: 'Payer UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'Payer UUID is required' })
  payerUuid!: string;

  @ApiProperty({
    example: '987f6543-e21b-32d1-b456-526614174fff',
    description: 'UUID of the trip associated with the expense',
  })
  @ApiProperty()
  @IsUUID('all', { message: 'Trip UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'Trip UUID is required' })
  tripUuid!: string;
}
