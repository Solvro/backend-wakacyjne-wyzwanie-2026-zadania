import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({
    description: 'ID of the associated trip',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  tripId: number;

  @ApiProperty({
    description: 'First name of the participant',
    example: 'Jan',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the participant',
    example: 'Kowalski',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;

  @ApiProperty({
    description: 'Email address of the participant',
    example: 'jan@example.com',
    maxLength: 255,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: 'Timestamp when participant joined (ISO 8601 string)',
    example: '2026-07-10T12:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  joinedAt: string;
}
