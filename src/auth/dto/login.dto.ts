import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'jan.kowalski@example.com' })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'strongPaswwd4#4' })
    @IsString()
    @IsNotEmpty()
    password!: string;
}