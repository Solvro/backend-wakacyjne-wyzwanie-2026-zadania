import { IsString, IsNumber, IsDateString, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: 'Summer Camp 2026' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 1500.0 })
  @IsNumber()
  @IsPositive()
  budget!: number;

  @ApiProperty({ example: '2026-07-01T10:00:00Z' })
  @IsDateString()
  startDate!: string;

  @ApiPropertyOptional({ example: '2026-07-07T18:00:00Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}