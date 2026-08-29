import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateParticipantDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name must contains something' })
  @MaxLength(40, { message: 'First name cannot be longer than 40 characters' })
  @ApiProperty({
    description: 'Name of a user',
    example: 'Andżej',
  })
  firstName!: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name must contains something' })
  @MaxLength(50, { message: 'Last name cannot be longer than 40 characters' })
  @ApiProperty({
    description: 'Surname of a user',
    example: 'Kocik',
  })
  lastName!: string;

  @IsEmail()
  @ApiProperty({
    description: 'Address email of a user',
    example: 'twoj@stary.pl',
  })
  email!: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if a participant is an adult',
    example: true,
  })
  isAdult!: boolean;
}
