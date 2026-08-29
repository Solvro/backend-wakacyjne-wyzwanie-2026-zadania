import { IsNotEmpty, IsDate, IsEnum, IsInt, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Currency } from '@prisma/client';

export class CreateExpenseDto {
  @ApiProperty({ example: 1, description: 'ID participant associated with this expense' })
  @IsInt({ message: 'Participant ID must be an integer' })
  @IsPositive({ message: 'Participant ID must be a positive number' })
  @IsNotEmpty({ message: 'Participant ID is required' })
  id_participant!: number;

  @ApiProperty({ example: 1, description: 'ID trip associated with this expense' })
  @IsInt({ message: 'Trip ID must be an integer' })
  @IsPositive({ message: 'Trip ID must be a positive number' })
  @IsNotEmpty({ message: 'Trip ID is required' })
  id_trip!: number;

  @ApiProperty({ example: 150.50, description: 'Expense amount' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a number (maximum 2 decimal places)' })
  @IsPositive({ message: 'Amount must be a positive number' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount!: number;

  @ApiProperty({ enum: Currency, example: Currency.PLN, description: 'Expense currency' })
  @IsEnum(Currency, { message: 'Currency must be one of the defined values in the system' })
  @IsNotEmpty({ message: 'Currency is required' })
  currency!: Currency;

  @ApiProperty({ example: '2026-08-28', description: 'Date of the expense' })
  @Type(() => Date)
  @IsDate({ message: 'Date must be in a valid format' })
  @IsNotEmpty({ message: 'Date is required' })
  date!: Date;
}