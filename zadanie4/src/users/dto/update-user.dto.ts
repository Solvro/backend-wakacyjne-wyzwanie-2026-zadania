import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'nowy.email@example.com', description: 'Opcjonalny nowy adres email' })
  @IsOptional()
  @IsEmail({}, { message: 'Nieprawidłowy adres email' })
  email?: string;

  @ApiPropertyOptional({ example: 'NoweHaslo123', description: 'Opcjonalne nowe hasło' })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Hasło musi zawierać co najmniej 6 znaków' })
  password?: string;
}