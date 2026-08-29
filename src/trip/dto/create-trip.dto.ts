import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TripCategory } from '@prisma/client';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTripDto {
  @ApiProperty({
    description: 'Tytuł wycieczki',
    example: 'Wyjazd w Tatry',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Kategoria wycieczki',
    enum: TripCategory,
    enumName: 'TripCategory',
    default: TripCategory.VACATION,
    example: TripCategory.VACATION,
  })
  @IsEnum(TripCategory)
  @IsOptional()
  category?: TripCategory;

  @ApiProperty({
    description: 'Data rozpoczęcia wycieczki w formacie ISO 8601',
    example: '2026-09-15T08:00:00.000Z',
  })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiPropertyOptional({
    description: 'Data zakończenia wycieczki w formacie ISO 8601',
    example: '2026-09-22T20:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Opcjonalny opis wycieczki',
    example: 'Coroczny wypad znajomych w Tatry',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
