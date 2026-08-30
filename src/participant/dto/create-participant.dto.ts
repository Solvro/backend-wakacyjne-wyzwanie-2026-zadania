import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan', description: 'Participant first name' })
  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @ApiProperty({ example: 'Kowalski', description: 'Participant last name' })
  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @ApiProperty({
    example: '2000-01-15',
    description: 'Participant birth date',
  })
  @IsDateString()
  @IsNotEmpty()
  birth_date!: string;

  @ApiPropertyOptional({
    example: '+48123456789',
    description: 'Participant phone number',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone_number?: string;

  @ApiPropertyOptional({
    example: 'jan@example.com',
    description: 'Participant email',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 1, description: 'Trip ID to assign participant to' })
  @IsInt()
  tripId!: number;
}
