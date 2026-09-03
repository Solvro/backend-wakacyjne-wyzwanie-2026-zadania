import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'jan.nowak@gmail.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Insert valid email' })
  email?: string;

  @ApiPropertyOptional({ example: 'Haslo12345' })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be atleast 8 characters long' })
  password?: string;
}