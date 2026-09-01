import { IsString, IsEmail, IsDateString, MaxLength, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({ description: 'Imię uczestnika', example: 'Jan' })
  @IsString()
  @MaxLength(50)
  name!: string;

  @ApiProperty({ description: 'Nazwisko uczestnika', example: 'Kowalski' })
  @IsString()
  @MaxLength(50)
  last_name!: string;

  @ApiProperty({ description: 'Numer telefonu', example: '+48123456789' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({ description: 'Email uczestnika', example: 'jan@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Data urodzenia', example: '1990-01-01' })
  @IsDateString()
  birthday_date!: string;
}