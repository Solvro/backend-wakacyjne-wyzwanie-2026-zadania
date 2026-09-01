import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { Status } from '../../../generated/prisma/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The title of the trip',
    example: 'Summer Vacation',
  })
  title?: string;

  @IsDateString({}, { message: 'Start date must be a valid date string' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The start date of the trip',
    example: '2026-07-01T00:00:00.000Z',
  })
  startDate?: string;

  @IsDateString({}, { message: 'End date must be a valid date string' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The end date of the trip',
    example: '2026-07-15T00:00:00.000Z',
  })
  endDate?: string;

  @IsEnum(Status, { message: 'Status must be a valid enum value' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The status of the trip',
    enum: Status,
    example: Status.ONGOING,
  })
  status?: Status;
}
