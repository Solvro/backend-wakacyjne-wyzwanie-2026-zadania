import { ApiProperty } from '@nestjs/swagger';

export class ExpenseResponseDto {
  @ApiProperty({
    description: 'Identyfikator wydatku (ExpenseID)',
    example: 1,
  })
  ExpenseID: number;

  @ApiProperty({
    description: 'Identyfikator przypisanej wycieczki (TripID)',
    example: 1,
  })
  TripID: number;

  @ApiProperty({
    description: 'Nazwa wydatku',
    example: 'Nocleg w schronisku',
  })
  ExpenseName: string;

  @ApiProperty({
    description: 'Koszt wydatku w PLN',
    example: 350.5,
  })
  Cost: number;
}
