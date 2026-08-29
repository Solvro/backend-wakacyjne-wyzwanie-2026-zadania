import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ParticipantResponseDto {
  @ApiProperty({ example: 1, description: 'Unikalny identyfikator uczestnika' })
  id: number;

  @ApiProperty({ example: 'Jan Kowalski', description: 'Imię i nazwisko' })
  name: string;

  @ApiPropertyOptional({
    example: 'jan@example.com',
    nullable: true,
    description: 'Adres e-mail uczestnika',
  })
  email?: string | null;

  @ApiProperty({ example: 1, description: 'ID przypisanej wycieczki' })
  tripId: number;
}
