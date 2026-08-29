import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Tytuł wydatku',
    example: 'Zakupy spożywcze',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Kwota wydatku',
    example: 124.5,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({
    description: 'Opcjonalny opis wydatku',
    example: 'Prowiant na całą wyprawę',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID wycieczki, do której przypisany jest wydatek',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  tripId: number;

  @ApiProperty({
    description: 'ID uczestnika, który pokrył wydatek',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  paidById: number;
}
