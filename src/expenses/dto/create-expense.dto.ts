import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 125.5 })
  @Type(() => Number)
  @IsNumber()
  cost!: number;

  @ApiPropertyOptional({ example: 'Dinner' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-08-28 18:30:00' })
  @IsDateString()
  date!: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  tripId!: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  participantId!: number;
}