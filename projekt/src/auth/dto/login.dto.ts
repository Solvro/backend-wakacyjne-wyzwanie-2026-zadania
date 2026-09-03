import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jan.nowak@gmail.com' })
  @IsEmail({}, { message: 'Insert valid email' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'Haslo123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}