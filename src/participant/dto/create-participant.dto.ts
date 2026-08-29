import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({
    description: 'Imię i nazwisko uczestnika',
    example: 'Jan Kowalski',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Adres e-mail uczestnika',
    example: 'jan@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'ID wycieczki, do której należy uczestnik',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  tripId: number;
}
