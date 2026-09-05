import { PaymentStatus } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({
    description: 'Identyfikator powiązanej wycieczki (TripID)',
    example: 1,
  })
  @IsNotEmpty({ message: 'TripID is required' })
  @IsInt({ message: 'TripID must be an integer' })
  @IsPositive({ message: 'TripID must be a positive integer' })
  TripID: number;

  @ApiProperty({
    description: 'Imię uczestnika',
    example: 'Jan',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(50, { message: 'Name must be at most 50 characters' })
  Name: string;

  @ApiProperty({
    description: 'Nazwisko uczestnika',
    example: 'Kowalski',
  })
  @IsNotEmpty({ message: 'Surname is required' })
  @IsString({ message: 'Surname must be a string' })
  @MaxLength(50, { message: 'Surname must be at most 50 characters' })
  Surname: string;

  @ApiProperty({
    description: 'Numer telefonu kontaktowego',
    example: '+48123456789',
  })
  @IsNotEmpty({ message: 'ContactNumber is required' })
  @IsString({ message: 'ContactNumber must be a string' })
  @MaxLength(20, { message: 'ContactNumber must be at most 20 characters' })
  ContactNumber: string;

  @ApiProperty({
    description: 'Status płatności uczestnika',
    enum: PaymentStatus,
    example: PaymentStatus.Paid,
  })
  @IsNotEmpty({ message: 'PaymentStatus is required' })
  @IsEnum(PaymentStatus, {
    message: 'PaymentStatus must be either Paid or Unpaid',
  })
  PaymentStatus: PaymentStatus;
}
