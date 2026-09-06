import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TripStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Wakacje w Chorwacji' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Split, Chorwacja' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: '2026-07-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-07-10' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @IsPositive()
  budget: number;

  @ApiProperty({ enum: TripStatus, example: TripStatus.PLANNED })
  @IsEnum(TripStatus)
  status: TripStatus;

  @ApiPropertyOptional({ example: 'Pamiętać o kremie z filtrem' })
  @IsOptional()
  @IsString()
  notes?: string;
}
