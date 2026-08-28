import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Paliwo' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 150.5 })
  @IsNumber()
  @Min(0)
  amount!: number;
}