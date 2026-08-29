import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExpenseResponseDto {
  @ApiProperty({ example: 1, description: 'Unikalny identyfikator wydatku' })
  id: number;

  @ApiProperty({ example: 'Zakupy spożywcze', description: 'Tytuł wydatku' })
  title: string;

  @ApiProperty({ example: 124.5, description: 'Kwota wydatku' })
  amount: number;

  @ApiPropertyOptional({
    example: 'Prowiant na całą wyprawę',
    nullable: true,
    description: 'Opis wydatku',
  })
  description?: string | null;

  @ApiProperty({ example: 1, description: 'ID przypisanej wycieczki' })
  tripId: number;

  @ApiProperty({ example: 1, description: 'ID uczestnika, który zapłacił' })
  paidById: number;
}
