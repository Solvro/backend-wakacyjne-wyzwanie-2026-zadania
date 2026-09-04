import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'nowy@email.pl', description: 'Nowy email użytkownika' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'NoweSilneHaslo123', description: 'Nowe hasło' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}
