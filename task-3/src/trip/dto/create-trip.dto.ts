import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTripDto {
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Title must contains something' })
  @ApiProperty({
    description: 'Title for a trip',
    example: 'Africa Safari',
  })
  title!: string;

  @ApiPropertyOptional({
    description: 'Description for a trip',
    example: 'We are about to hunt some meat',
  })
  description?: string;

  @IsInt({ message: 'Must be a no decimal number' })
  @IsPositive()
  @ApiProperty({
    description: 'Maximum number of participants that can take part in trip',
    example: 24,
  })
  maxSlots!: number;

  @IsNotEmpty({ message: 'Start date cannot be empty' })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  @ApiProperty({
    description: 'When a trip starts',
    example: '2026-12-10T10:00:00Z',
  })
  startDate!: Date;

  @IsNotEmpty({ message: 'End date cannot be empty' })
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  @ApiProperty({
    description: 'When a trip ends',
    example: '2026-12-17T10:00:00Z',
  })
  endDate!: Date;
}
