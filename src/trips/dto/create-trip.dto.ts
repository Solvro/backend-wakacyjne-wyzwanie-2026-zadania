import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ description: 'Tytuł / nazwa wycieczki', example: 'Wakacje w Tatrach' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Data rozpoczęcia wycieczki (YYYY-MM-DD)', example: '2026-09-01' })
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({ description: 'Data zakończenia wycieczki (YYYY-MM-DD)', example: '2026-09-07' })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @ApiPropertyOptional({ description: 'Opcjonalny opis wycieczki', example: 'Wyprawa w góry ze znajomymi' })
  @IsString()
  @IsOptional()
  description?: string;
}
