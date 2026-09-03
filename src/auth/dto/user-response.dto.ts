import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unikalny identyfikator użytkownika',
  })
  id: number;

  @ApiProperty({
    example: 'jan.kowalski@example.com',
    description: 'Adres e-mail użytkownika',
  })
  email: string;
}
