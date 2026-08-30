import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { Status } from '../../../generated/prisma/enums';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsDateString({}, { message: 'Start date must be a valid date string' })
  @IsOptional()
  startDate?: string;

  @IsDateString({}, { message: 'End date must be a valid date string' })
  @IsOptional()
  endDate?: string;

  @IsEnum(Status, { message: 'Status must be a valid enum value' })
  @IsOptional()
  status?: Status;
}
