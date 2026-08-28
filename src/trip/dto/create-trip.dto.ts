import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Wyjazd w Tatry', description: 'Nazwa wycieczki' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Zimowy wyjazd na narty', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2026-12-10T10:00:00Z', description: 'Data w formacie ISO' })
  @IsDateString()
  start_date!: string;
}
