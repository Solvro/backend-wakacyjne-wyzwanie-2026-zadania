import { ApiProperty } from '@nestjs/swagger';

export class ExpenseResponseDto {
  @ApiProperty({ example: 1, description: 'Unikalny identyfikator wydatku' })
  id: number;

  @ApiProperty({ example: 'Obiad w schronisku', description: 'Tytuł wydatku' })
  title: string;

  @ApiProperty({ example: 50.00, description: 'Kwota wydatku' })
  amount: number | string;

  @ApiProperty({ example: 'PLN', description: 'Waluta wydatku' })
  currency: string;

  @ApiProperty({ example: '2026-09-02T00:00:00.000Z', description: 'Data poniesienia wydatku' })
  date: Date;

  @ApiProperty({ example: 1, description: 'ID powiązanej wycieczki' })
  trip_id: number;

  @ApiProperty({ example: 1, description: 'ID uczestnika, który opłacił wydatek' })
  paid_by_participant_id: number;
}
