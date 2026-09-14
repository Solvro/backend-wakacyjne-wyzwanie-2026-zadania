import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 125.50 })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ example: 'Mountain guide fee' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: '2026-07-16T12:00:00.000Z' })
  @IsDateString()
  date!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  tripId!: number;
}