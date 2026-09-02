import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Podaj poprawny adres email' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  password!: string;
}
