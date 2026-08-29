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
  firstName!: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name must contains something' })
  @MaxLength(50, { message: 'Last name cannot be longer than 40 characters' })
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsBoolean()
  isAdult!: boolean;
}
