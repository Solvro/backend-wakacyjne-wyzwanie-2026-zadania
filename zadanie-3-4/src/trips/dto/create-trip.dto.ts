import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTripDto {
  @ApiProperty({
    example: 'Summer Vacation in Spain',
    description: 'Title of the trip',
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title!: string;

  @ApiPropertyOptional({
    example: 'Our summer trip',
    description: 'Detailed description of the trip',
    maxLength: 500,
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description?: string;

  @ApiPropertyOptional({
    example: '2026-07-01T00:00:00.000Z',
    description: 'Start date of the trip (ISO format)',
    nullable: true,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    example: '2026-08-01T00:00:00.000Z',
    description: 'End date of the trip (ISO format)',
    nullable: true,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;
}
