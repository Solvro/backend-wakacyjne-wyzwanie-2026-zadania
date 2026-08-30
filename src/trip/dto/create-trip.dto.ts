import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Status } from '../../../generated/prisma/enums';

export class CreateTripDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsDateString({}, { message: 'Start date must be a valid date string' })
  @IsNotEmpty({ message: 'Start date is required' })
  startDate!: string;

  @IsDateString({}, { message: 'End date must be a valid date string' })
  @IsOptional()
  endDate?: string;

  @IsEnum(Status, { message: 'Status must be a valid enum value' })
  @IsNotEmpty({ message: 'Status is required' })
  status!: Status;
}
