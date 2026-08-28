import {
  IsCurrency,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateParticipantDto {
  @IsString({ message: 'firstName must be a string' })
  @IsNotEmpty({ message: 'firstName is required' })
  @MaxLength(50, {
    message: 'firstName must be at most 50 characters in length',
  })
  firstName!: string;

  @IsString({ message: 'firstName must be a string' })
  @IsNotEmpty({ message: 'firstName is required' })
  @MaxLength(50, {
    message: 'firstName must be at most 50 characters in length',
  })
  lastName!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'budget is required' })
  @IsCurrency({ allow_negatives: false, require_symbol: true, symbol: 'zł' })
  budget!: number;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email!: string;

  @IsPhoneNumber('PL')
  phone?: string;

  @IsNumber()
  @IsNotEmpty({
    message:
      'tripId is required - participant must be assigned to an existing trip',
  })
  tripId!: number;
}
