import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'new.email@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'newPassword422', description: 'Minimum 8 characters' })
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;
}