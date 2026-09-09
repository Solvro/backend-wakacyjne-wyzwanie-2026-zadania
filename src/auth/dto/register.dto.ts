import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'jan.kowalski@example.com' })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'strongPaswwd4#4', description: 'Password with minimum 8 characters' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;
}