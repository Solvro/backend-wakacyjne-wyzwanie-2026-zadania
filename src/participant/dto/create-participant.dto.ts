import { IsEmail, IsString, IsNotEmpty, IsOptional, MinLength, IsDate, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Nationality } from '@prisma/client';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jakub', description: 'Participant name' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(2, { message: 'Name is too short' })
  name!: string;

  @ApiProperty({ example: 'Luzak', description: 'Participant surname' })
  @IsString({ message: 'Surname must be a string' })
  @IsNotEmpty({ message: 'Surname cannot be empty' })
  @MinLength(2, { message: 'Surname is too short' })
  surname!: string;

  @ApiProperty({ example: '2007-10-27', description: 'Participant birth date' })
  @Type(() => Date)
  @IsDate({ message: 'Birth date must be a valid date' })
  birthDate!: Date;

  @ApiProperty({ example: 'Polish', description: 'Participant nationality' })
  @IsString({ message: 'Nationality must be a string' })
  @IsEnum(Nationality, { message: 'Nationality must be one of the defined values in the system' })
  @IsNotEmpty({ message: 'Nationality cannot be empty' })
  nationality!: Nationality;

  @ApiPropertyOptional({ example: 'jakub.luzak@gmail.com', description: 'Participant email address' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email!: string;
}