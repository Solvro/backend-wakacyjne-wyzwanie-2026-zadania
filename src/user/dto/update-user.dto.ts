import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
    @ApiPropertyOptional({ example: 'nowy@mail.com', description: 'Nowy adres e-mail' })
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Hasło musi mieć minimum 6 znaków' })
    @ApiPropertyOptional({ example: 'NoweHaslo123!', description: 'Nowe hasło' })
    password?: string;
}