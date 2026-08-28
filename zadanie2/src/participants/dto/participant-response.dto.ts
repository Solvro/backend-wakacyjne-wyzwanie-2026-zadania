import { ApiProperty } from '@nestjs/swagger';

export class ParticipantResponseDto {
  @ApiProperty({ example: 1, description: 'Unikalny identyfikator uczestnika' })
  id: number;

  @ApiProperty({ example: 'Jan Kowalski', description: 'Imię i nazwisko uczestnika' })
  name: string;

  @ApiProperty({ example: 'jan.kowalski@example.com', description: 'Adres e-mail' })
  email: string;

  @ApiProperty({ example: 'active', description: 'Status uczestnika' })
  status: string;
}
