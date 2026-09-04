import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'nowy.email@example.com' })
    @IsEmail({}, { message: 'Niepoprawny format adresu email' })
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: 'Nowe Imie' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'nowehaslo123' })
    @IsString()
    @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
    @IsOptional()
    password?: string;
}