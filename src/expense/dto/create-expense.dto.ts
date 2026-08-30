import { ApiProperty } from '@nestjs/swagger';
import { Currency, ExpenseStatus } from 'src/generated/prisma/enums';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Obiad w restauracji', description: 'Expense name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 1, description: 'Trip ID' })
  @IsInt()
  trip_id!: number;

  @ApiProperty({ example: 1, description: 'Participant ID' })
  @IsInt()
  participant_id!: number;

  @ApiProperty({ example: 150.5, description: 'Expense amount' })
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiProperty({
    enum: Currency,
    example: Currency.PLN,
    description: 'Expense currency',
  })
  @IsEnum(Currency)
  @IsNotEmpty()
  currency!: Currency;

  @ApiProperty({
    enum: ExpenseStatus,
    example: ExpenseStatus.pending,
    description: 'Expense status',
  })
  @IsEnum(ExpenseStatus)
  @IsNotEmpty()
  status!: ExpenseStatus;
}
