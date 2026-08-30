import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TripResponseDto {
  @ApiProperty({ example: 1, description: 'Unikalny identyfikator wycieczki' })
  id: number;

  @ApiProperty({ example: 'Wakacje w Tatrach', description: 'Tytuł wycieczki' })
  title: string;

  @ApiProperty({ example: '2026-09-01T00:00:00.000Z', description: 'Data rozpoczęcia' })
  start_date: Date;

  @ApiProperty({ example: '2026-09-07T00:00:00.000Z', description: 'Data zakończenia' })
  end_date: Date;

  @ApiPropertyOptional({ example: 'Wyprawa w góry ze znajomymi', description: 'Opis wycieczki' })
  description?: string | null;
}
