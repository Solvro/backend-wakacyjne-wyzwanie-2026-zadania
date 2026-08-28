import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MaxLength,
} from 'class-validator';
import { ExpenseType } from '../../generated/prisma';

export class CreateExpenseDto {
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  @MaxLength(100, {
    message: 'title must be at most 100 characters in length',
  })
  title!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'value is required' })
  @Min(0, { message: 'value must not be negative' })
  value!: number;

  @IsNumber()
  @IsNotEmpty({
    message:
      'tripId is required - expense must be assigned to an existing trip',
  })
  tripId!: number;

  @IsOptional()
  @IsNumber()
  participantId?: number;

  @IsOptional()
  @IsEnum(ExpenseType, { message: 'type must be a valid ExpenseType' })
  type?: ExpenseType;
}
