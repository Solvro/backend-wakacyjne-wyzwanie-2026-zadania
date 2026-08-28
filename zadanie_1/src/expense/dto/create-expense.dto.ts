import { IsString, IsNotEmpty, IsInt, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ example: 1, description: 'ID wycieczki' })
  @IsInt()
  @IsNotEmpty()
  Trip_id!: number;

  @ApiProperty({ example: 1, description: 'ID uczestnika płacącego' })
  @IsInt()
  @IsNotEmpty()
  Participant_id!: number;

  @ApiProperty({ example: 150.5, description: 'Kwota wydatku' })
  @IsNumber()
  @Min(0)
  Amount!: number;

  @ApiProperty({ example: 'Jedzenie', description: 'Kategoria wydatku' })
  @IsString()
  @IsNotEmpty()
  Category!: string;
}
