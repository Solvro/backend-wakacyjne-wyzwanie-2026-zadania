import { TripStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Krakow' })
  @IsString()
  @IsNotEmpty()
  destination!: string;

  @ApiProperty({ example: '2026-08-28 18:30:00' })
  @IsDateString()
  startDate!: string;

  @ApiPropertyOptional({ example: '2026-08-30 18:30:00' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ enum: TripStatus, default: TripStatus.PLANNED })
  @IsOptional()
  @IsEnum(TripStatus)
  status?: TripStatus;
}