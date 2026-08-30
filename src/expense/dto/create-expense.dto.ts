import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '@prisma/client';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nazwa wydatku', example: 'Paliwo na dojazd' })
  note!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Kwota wydatku', example: 250.50 })
  amount!: number;

  @IsEnum(ExpenseCategory)
  @IsNotEmpty()
  @ApiProperty({ description: 'Kategoria wydatku', enum: ExpenseCategory, example: ExpenseCategory.TRANSPORT })
  category!: ExpenseCategory;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID powiązanej wycieczki', example: 1 })
  tripId!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID uczestnika, który zapłacił', example: 1 })
  payerId!: number;
}