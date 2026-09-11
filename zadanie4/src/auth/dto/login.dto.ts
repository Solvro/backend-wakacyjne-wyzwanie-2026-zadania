import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jan.kowalski@example.com' })
  @IsEmail({}, { message: 'Nieprawidłowy adres email' })
  @IsNotEmpty({ message: 'Email jest wymagany' })
  email: string;

  @ApiProperty({ example: 'Haslo123' })
  @IsString()
  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  password: string;
}