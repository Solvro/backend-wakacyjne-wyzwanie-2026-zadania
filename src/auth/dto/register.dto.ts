import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'jan.kowalski@example.com',
    description: 'Adres e-mail użytkownika',
  })
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  @IsNotEmpty({ message: 'Adres e-mail nie może być pusty' })
  email: string;

  @ApiProperty({
    example: 'bezpieczneHaslo123',
    description: 'Hasło użytkownika (minimum 6 znaków)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Hasło nie może być puste' })
  @MinLength(6, { message: 'Hasło musi zawierać co najmniej 6 znaków' })
  password: string;
}
