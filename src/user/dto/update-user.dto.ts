import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'nowy-adres@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
