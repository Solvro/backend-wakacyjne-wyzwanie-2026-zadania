import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TripResponseDto {
  @ApiProperty({ description: 'Identyfikator wycieczki (TripID)', example: 1 })
  TripID: number;

  @ApiProperty({
    description: 'Data rozpoczęcia wycieczki w formacie ISO',
    example: '2026-07-15T10:00:00.000Z',
  })
  TripDate: Date;

  @ApiProperty({
    description: 'Miejsce docelowe wycieczki',
    example: 'Zakopane, Tatry',
  })
  Destination: string;

  @ApiPropertyOptional({
    description: 'Opis wycieczki',
    example: 'Weekendowy wyjazd w góry z przewodnikiem',
  })
  Description?: string | null;
}
