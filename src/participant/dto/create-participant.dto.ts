import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan Kowalski', description: 'Imię i nazwisko' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 1, description: 'ID wycieczki' })
  @IsInt()
  @IsNotEmpty()
  trip_id!: number;
}