import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateParticipantDto {
  @IsString({ message: 'Imię musi być tekstem' })
  @IsNotEmpty({ message: 'Imię jest wymagane' })
  name!: string;

  @IsNumber({}, { message: 'ID wycieczki musi być liczbą' })
  @IsNotEmpty({ message: 'ID wycieczki jest wymagane' })
  tripId!: number;
}
