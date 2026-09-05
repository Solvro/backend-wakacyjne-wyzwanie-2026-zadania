import { IsInt, IsPositive, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { ExpenseType } from '@prisma/client';
import {ApiProperty} from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'The unique identifier of the trip to which this expense belongs',
    example: 12,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  tripId!: number;

  @ApiProperty({
    description: 'The category of the expense',
    enum: ExpenseType,
    example: ExpenseType.FOOD,
  })
  @IsEnum(ExpenseType)
  @IsNotEmpty()
  type!: ExpenseType;

  @ApiProperty({
    description: 'The total monetary amount of the expense',
    example: 125.50,
  })
  @IsNumber({maxDecimalPlaces: 2}) 
  @Min(0)     
  @IsNotEmpty()
  amount! : number;
}