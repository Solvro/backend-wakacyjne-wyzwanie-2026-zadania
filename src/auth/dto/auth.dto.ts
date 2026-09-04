import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'jan@kowalski.pl', description: 'Email użytkownika' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'SilneHaslo123', description: 'Hasło użytkownika' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}