import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'jan.kowalski@example.com', description: 'Adres email' })
  @IsEmail({}, { message: 'Nieprawidłowy format email' })
  @IsNotEmpty({ message: 'Email jest wymagany' })
  email: string;

  @ApiProperty({ example: 'Haslo123', description: 'Hasło użytkownika' })
  @IsString()
  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  @MinLength(6, { message: 'Hasło musi zawierać co najmniej 6 znaków' })
  password: string;
}