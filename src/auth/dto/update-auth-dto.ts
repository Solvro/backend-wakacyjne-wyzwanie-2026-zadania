import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto {
  @IsOptional()
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  password?: string;
}
