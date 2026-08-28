import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsPositive, Min } from 'class-validator';
import { ExpenseType } from '../../generated/prisma/enums.js';

export class CreateExpenseDto {
  @ApiProperty({ example: 1, description: 'Id wycieczki, do której należy wydatek' })
  @IsInt()
  Trip_id: number;

  @ApiProperty({ example: 1, description: 'Id uczestnika, który zapłacił' })
  @IsInt()
  Payer_id: number;

  @ApiProperty({ enum: ExpenseType, example: ExpenseType.FOOD, description: 'Kategoria wydatku' })
  @IsEnum(ExpenseType)
  Type: ExpenseType;

  @ApiProperty({ example: 150.5, description: 'Kwota wydatku' })
  @IsNumber()
  @IsPositive()
  Amount: number;
}