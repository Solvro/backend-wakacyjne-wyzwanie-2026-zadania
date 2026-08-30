import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ description: 'Imię i nazwisko uczestnika', example: 'Jan Kowalski' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Adres e-mail uczestnika', example: 'jan.kowalski@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Status uczestnika', example: 'active' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
