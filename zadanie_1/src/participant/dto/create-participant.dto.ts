import { IsString, IsNotEmpty, IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({ example: 1, description: 'ID wycieczki' })
  @IsInt()
  @IsNotEmpty()
  Trip_id!: number;

  @ApiProperty({ example: 'Jan', description: 'Imię' })
  @IsString()
  @IsNotEmpty()
  Name!: string;

  @ApiProperty({ example: 'Kowalski', description: 'Nazwisko' })
  @IsString()
  @IsNotEmpty()
  Surname!: string;

  @ApiProperty({ example: '90010112345', description: 'Numer PESEL (11 cyfr)' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'PESEL musi mieć dokładnie 11 cyfr' })
  Pesel!: string;
}
