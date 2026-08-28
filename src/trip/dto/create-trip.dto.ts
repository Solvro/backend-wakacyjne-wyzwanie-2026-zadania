import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ description: 'Nazwa wycieczki', example: 'Wakacje w Chorwacji' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Data rozpoczęcia w formacie ISO', example: '2026-08-15T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate!: string;
}