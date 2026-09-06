import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'jan.kowalski@example.com',
    description: 'Adres e-mail użytkownika',
  })
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  @IsNotEmpty({ message: 'Adres e-mail nie może być pusty' })
  email: string;

  @ApiProperty({
    example: 'bezpieczneHaslo123',
    description: 'Hasło użytkownika',
  })
  @IsString()
  @IsNotEmpty({ message: 'Hasło nie może być puste' })
  password: string;
}
