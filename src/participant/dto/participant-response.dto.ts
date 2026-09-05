import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';

export class ParticipantResponseDto {
  @ApiProperty({
    description: 'Identyfikator uczestnika (ParticipantID)',
    example: 1,
  })
  ParticipantID: number;

  @ApiProperty({
    description: 'Identyfikator przypisanej wycieczki (TripID)',
    example: 1,
  })
  TripID: number;

  @ApiProperty({
    description: 'Imię uczestnika',
    example: 'Jan',
  })
  Name: string;

  @ApiProperty({
    description: 'Nazwisko uczestnika',
    example: 'Kowalski',
  })
  Surname: string;

  @ApiProperty({
    description: 'Numer telefonu kontaktowego',
    example: '+48123456789',
  })
  ContactNumber: string;

  @ApiProperty({
    description: 'Status płatności',
    enum: PaymentStatus,
    example: PaymentStatus.Paid,
  })
  PaymentStatus: PaymentStatus;
}
