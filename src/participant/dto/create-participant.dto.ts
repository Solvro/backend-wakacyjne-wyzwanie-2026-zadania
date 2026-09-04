import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParticipantDto {
  @IsString({ message: 'Imię musi być tekstem' })
  @IsNotEmpty({ message: 'Imię jest wymagane' })
  @ApiProperty({ description: 'Imię uczestnika', example: 'Michał' })
  name!: string;

  @IsString({ message: 'Nazwisko musi być tekstem' })
  @IsNotEmpty({ message: 'Nazwisko jest wymagane' })
  @ApiProperty({ description: 'Nazwisko uczestnika', example: 'Woźniak' })
  surname!: string;

  @IsEmail({}, { message: 'Niepoprawny format email' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Email uczestnika', example: 'michal@example.com' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Telefon uczestnika', example: '123456789' })
  tel?: string;
}