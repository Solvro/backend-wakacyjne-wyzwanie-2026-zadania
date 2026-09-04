import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'nowy.email@example.com',
    description: 'Nowy adres e-mail użytkownika',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  email?: string;

  @ApiPropertyOptional({
    example: 'noweBezpieczneHaslo123',
    description: 'Nowe hasło użytkownika (minimum 6 znaków)',
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Hasło musi zawierać co najmniej 6 znaków' })
  password?: string;
}
