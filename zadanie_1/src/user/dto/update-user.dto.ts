import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Niepoprawny format adresu email' })
  @IsNotEmpty({ message: 'Email jest wymagany' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'Imię jest wymagane' })
  name!: string;
}