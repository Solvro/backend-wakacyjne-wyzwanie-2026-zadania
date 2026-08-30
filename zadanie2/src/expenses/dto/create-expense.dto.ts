import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ description: 'Tytuł / opis wydatku', example: 'Obiad w schronisku' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Kwota wydatku', example: 50.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Waluta wydatku', example: 'PLN' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ description: 'Data poniesienia wydatku (YYYY-MM-DD)', example: '2026-09-02' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'ID wycieczki, do której przypisany jest wydatek', example: 1 })
  @IsInt()
  @IsNotEmpty()
  trip_id: number;

  @ApiProperty({ description: 'ID uczestnika, który opłacił wydatek', example: 1 })
  @IsInt()
  @IsNotEmpty()
  paid_by_participant_id: number;
}
