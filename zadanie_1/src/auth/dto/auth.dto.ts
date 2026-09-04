import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Niepoprawny format adresu email' })
  @IsNotEmpty({ message: 'Email jest wymagany' })
  email!: string;

  @IsString({ message: 'Hasło musi być ciągiem znaków' })
  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  password!: string;

  @IsString({ message: 'Imię musi być ciągiem znaków' })
  @IsNotEmpty({ message: 'Imię jest wymagane' })
  name!: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Niepoprawny format adresu email' })
  @IsNotEmpty({ message: 'Email jest wymagany' })
  email!: string;

  @IsString({ message: 'Hasło musi być ciągiem znaków' })
  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  password!: string;
}