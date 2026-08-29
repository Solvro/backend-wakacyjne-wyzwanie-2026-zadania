import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Value of cost',
    example: '79.99',
  })
  value!: number;

  @IsNotEmpty({ message: 'Currency cannot be empty' })
  @IsEnum(Currency, {
    message: 'Currency must be a valid option (e.g., PLN, EUR, USD)',
  })
  @ApiProperty({
    description: 'Currency of the expense',
    enum: Currency,
    example: Currency.PLN,
  })
  currency!: Currency;

  @IsInt({ message: 'Must be a integer' })
  @ApiProperty({
    description: 'Id of related trip',
    example: 123,
  })
  tripId!: number;

  @IsInt({ message: 'Must be a integer' })
  @ApiProperty({
    description: 'Id of related participant',
    example: 321,
  })
  participantId!: number;
}
