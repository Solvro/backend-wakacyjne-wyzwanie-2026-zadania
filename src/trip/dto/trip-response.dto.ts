import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TripCategory } from '@prisma/client';

export class TripResponseDto {
  @ApiProperty({ example: 1, description: 'Unikalny identyfikator wycieczki' })
  id: number;

  @ApiProperty({ example: 'Wyjazd w Tatry', description: 'Tytuł wycieczki' })
  title: string;

  @ApiProperty({
    enum: TripCategory,
    enumName: 'TripCategory',
    example: TripCategory.VACATION,
    description: 'Kategoria wycieczki',
  })
  category: TripCategory;

  @ApiProperty({
    example: '2026-09-15T08:00:00.000Z',
    description: 'Data rozpoczęcia wycieczki',
  })
  startDate: Date;

  @ApiPropertyOptional({
    example: '2026-09-22T20:00:00.000Z',
    nullable: true,
    description: 'Data zakończenia wycieczki',
  })
  endDate?: Date | null;

  @ApiPropertyOptional({
    example: 'Coroczny wypad znajomych w Tatry',
    nullable: true,
    description: 'Opis wycieczki',
  })
  description?: string | null;
}
