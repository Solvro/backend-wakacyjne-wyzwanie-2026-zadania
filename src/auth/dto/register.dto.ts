import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Niepoprawny email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Hasło musi zawierać co najmniej 6 znaków' })
  password: string;
}