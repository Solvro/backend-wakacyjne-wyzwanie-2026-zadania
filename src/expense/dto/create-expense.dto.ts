import { IsNumber, IsNotEmpty, Min, IsEnum } from 'class-validator';
import { Currency } from '@prisma/client';

export class CreateExpenseDto {
  @IsNumber({}, { message: 'Kwota musi być liczbą' })
  @Min(0, { message: 'Kwota wydatku nie może być ujemna' })
  amount!: number;

  @IsEnum(Currency, { message: 'Waluta musi być jedną z: PLN, EUR, USD' })
  @IsNotEmpty({ message: 'Waluta jest wymagana' })
  currency!: Currency;

  @IsNumber({}, { message: 'ID wycieczki musi być liczbą' })
  @IsNotEmpty({ message: 'ID wycieczki jest wymagane' })
  tripId!: number;
}
