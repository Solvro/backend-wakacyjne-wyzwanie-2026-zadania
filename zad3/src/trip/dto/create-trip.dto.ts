import { IsString, IsNotEmpty, MaxLength, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { TripStatus } from '@prisma/client'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({
    description: 'The destination city or country of the trip',
    example: 'Paris, France',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255) 
  destination!: string;

  @ApiProperty({
    description: 'The name of the hotel accommodation',
    example: 'Hilton Paris Opera',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  hotelName!: string;

  @ApiProperty({
    description: 'The starting location or meeting point for the departure',
    example: 'Central Railway Station',
    required: false, // Explicitly tells Swagger this field can be omitted
  })
  @IsString()
  @IsOptional() 
  @MaxLength(255)
  departurePlace?: string;

  @ApiProperty({
    description: 'The departure date and time in ISO 8601 format',
    example: '2026-10-15T08:30:00.000Z',
    required: false,
  })
  @IsDateString() 
  @IsOptional()
  departureDate?: string;

  @ApiProperty({
    description: 'The return date and time in ISO 8601 format',
    example: '2026-10-22T18:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @ApiProperty({
    description: 'The current scheduling status of the trip',
    enum: TripStatus,
    example: TripStatus.ENDED,
  })
  @IsEnum(TripStatus)
  @IsNotEmpty() 
  status!: TripStatus;
}