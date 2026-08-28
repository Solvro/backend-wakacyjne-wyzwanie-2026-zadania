import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 150.50, description: 'Kwota wydatku' })
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ example: 'FOOD', description: 'Kategoria wydatku' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: 1, description: 'ID wycieczki' })
  @IsInt()
  @IsNotEmpty()
  trip_id!: number;

  @ApiProperty({ example: 1, description: 'ID uczestnika' })
  @IsInt()
  @IsNotEmpty()
  participant_id!: number;
}
