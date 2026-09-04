import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({
    example: '987f6543-e21b-32d1-b456-526614174fff',
    description: 'UUID of the trip associated with the participant',
  })
  @IsUUID('all', { message: 'Trip UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'Trip UUID cannot be empty' })
  tripUuid!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the user joining the trip',
  })
  @IsUUID('all', { message: 'User UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'User UUID cannot be empty' })
  userUuid!: string;

  @ApiPropertyOptional({
    example: 'Organizer',
    description: 'Optional nickname for the participant in this trip',
    maxLength: 50,
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Nickname must be a text' })
  @MaxLength(50, { message: 'Nickname can be up to 50 characters long' })
  nicknameInTrip?: string;
}
