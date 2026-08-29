import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { TripStatus } from '../../../generated/prisma/client';

export class CreateTripDto {
  @ApiProperty({
    description: 'Name of the trip',
    example: 'Wakacje w Hiszpanii',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Trip destination',
    example: 'Barcelona',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  destination: string;

  @ApiProperty({
    description: 'Start date of the trip (ISO 8601 string)',
    example: '2026-07-10T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'End date of the trip (ISO 8601 string)',
    example: '2026-07-17T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    enum: TripStatus,
    enumName: 'TripStatus',
    description: 'Current status of the trip',
    example: TripStatus.PLANNED,
  })
  @IsEnum(TripStatus)
  @IsNotEmpty()
  status: TripStatus;
}
