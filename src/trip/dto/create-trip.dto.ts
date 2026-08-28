import { IsString, IsNotEmpty, IsOptional, MinLength, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTripDto {
  @ApiProperty({ example: 'Trip to the mountains', description: 'Trip name' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(2, { message: 'Name is too short' })
  name!: string;

  @ApiProperty({ example: '2026-09-01', description: 'Trip start date' })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  @IsNotEmpty({ message: 'Start date is required' })
  startDate!: Date;

  @ApiProperty({ example: '2026-09-10', description: 'Trip end date' })
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  @IsNotEmpty({ message: 'End date is required' })
  endDate!: Date;

  @ApiPropertyOptional({ example: 'A trip to the mountains with friends', description: 'Trip description' })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}