import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateTripDto {
  @IsString({ message: 'Nazwa wycieczki musi być tekstem' })
  @IsNotEmpty({ message: 'Nazwa wycieczki jest wymagana' })
  name!: string;

  @IsDateString(
    {},
    { message: 'Nieprawidłowy format daty (użyj np. YYYY-MM-DD)' },
  )
  @IsNotEmpty({ message: 'Data rozpoczęcia jest wymagana' })
  startDate!: string;

  @IsString({ message: 'Opis musi być tekstem' })
  @IsOptional()
  description?: string;
}
