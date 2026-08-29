import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({
    description: 'Data rozpoczęcia wycieczki w formacie ISO',
    example: '2026-07-15T10:00:00.000Z',
  })
  @IsNotEmpty({ message: 'TripDate is required' })
  @IsDateString({}, { message: 'TripDate must be a valid ISO date string' })
  TripDate: string;

  @ApiProperty({
    description: 'Miejsce docelowe wycieczki',
    example: 'Zakopane, Tatry',
  })
  @IsNotEmpty({ message: 'Destination is required' })
  @IsString({ message: 'Destination must be a string' })
  @MaxLength(100, { message: 'Destination must be at most 100 characters' })
  Destination: string;

  @ApiPropertyOptional({
    description: 'Opcjonalny opis wycieczki',
    example: 'Weekendowy wyjazd w góry z przewodnikiem',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description must be at most 500 characters' })
  Description?: string;
}
