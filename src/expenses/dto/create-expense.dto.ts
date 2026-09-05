import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Identyfikator powiązanej wycieczki (TripID)',
    example: 1,
  })
  @IsNotEmpty({ message: 'TripID is required' })
  @IsInt({ message: 'TripID must be an integer' })
  @IsPositive({ message: 'TripID must be a positive integer' })
  TripID: number;

  @ApiProperty({
    description: 'Nazwa wydatku',
    example: 'Nocleg w schronisku',
  })
  @IsNotEmpty({ message: 'ExpenseName is required' })
  @IsString({ message: 'ExpenseName must be a string' })
  @MaxLength(100, { message: 'ExpenseName must be at most 100 characters' })
  ExpenseName: string;

  @ApiProperty({
    description: 'Koszt wydatku w PLN',
    example: 350.5,
  })
  @IsNotEmpty({ message: 'Cost is required' })
  @IsNumber({}, { message: 'Cost must be a number' })
  @Min(0, { message: 'Cost cannot be negative' })
  Cost: number;
}
