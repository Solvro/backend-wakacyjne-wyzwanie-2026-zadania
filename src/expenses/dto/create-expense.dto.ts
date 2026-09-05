import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Nocleg w schronisku' })
  @IsString()
  productName: string;

  @ApiProperty({ example: 120, minimum: 0 })
  @IsNumber()
  @Min(0)
  amountPln: number;

  @ApiProperty({ enum: Category, example: Category.Accomodation })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({ example: 1, description: 'ID uczestnika' })
  @IsInt()
  paidById: number;

  @ApiProperty({ example: 1, description: 'ID wycieczki' })
  @IsInt()
  tripId: number;
}