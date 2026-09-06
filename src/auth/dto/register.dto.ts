import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'jan@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'mocneHaslo123' })
  @IsString()
  @MinLength(8)
  password: string;
}
