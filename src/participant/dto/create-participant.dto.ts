import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan Kowalski', description: 'Imię i nazwisko uczestnika' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiPropertyOptional({ example: 'jan@example.com', description: 'Adres e-mail (opcjonalny)' })
  @IsOptional()
  @IsEmail()
  Email?: string;

  @ApiProperty({ example: 25, description: 'Wiek uczestnika' })
  @IsInt()
  @Min(0)
  Age: number;

  @ApiProperty({ example: '123456789', description: 'Numer telefonu' })
  @IsString()
  @IsNotEmpty()
  Phone: string;
}