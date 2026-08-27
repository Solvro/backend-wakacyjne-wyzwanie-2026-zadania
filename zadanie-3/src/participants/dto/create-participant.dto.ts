import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateParticipantDto {
  @IsUUID('all', { message: 'Trip UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'Trip UUID cannot be empty' })
  tripUuid!: string;

  @IsUUID('all', { message: 'User UUID must be a valid UUID' })
  @IsNotEmpty({ message: 'User UUID cannot be empty' })
  userUuid!: string;

  @IsOptional()
  @IsString({ message: 'Nickname must be a text' })
  @MaxLength(50, { message: 'Nickname can be up to 50 characters long' })
  nicknameInTrip?: string;
}
