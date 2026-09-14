import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { TripStatus } from '@prisma/client';

export class CreateTripDto {
  @ApiProperty({ example: 'Alpine Hiking Tour', description: 'Name of the trip' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: TripStatus, example: TripStatus.PLANNED })
  @IsEnum(TripStatus)
  status!: TripStatus;

  @ApiProperty({ example: '2026-07-15T08:00:00.000Z' })
  @IsDateString()
  startDate!: string;
}