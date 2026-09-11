import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Bilety do muzeum', description: 'Opis wydatku' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 150.50, description: 'Kwota wydatku' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 1, description: 'ID wyjazdu' })
  @IsInt()
  @IsNotEmpty()
  tripId: number;

  @ApiProperty({ example: 2, description: 'ID uczestnika, który zapłacił' })
  @IsInt()
  @IsNotEmpty()
  payerId: number;
}