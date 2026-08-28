import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Kraków', description: 'Miejsce docelowe wycieczki' })
  @IsString()
  @IsNotEmpty()
  Location: string;

  @ApiProperty({ example: '2026-07-01T00:00:00.000Z', description: 'Data rozpoczęcia wycieczki' })
  @IsDateString()
  Begin_date: string;

  @ApiPropertyOptional({ example: '2026-07-10T00:00:00.000Z', description: 'Data zakończenia wycieczki (opcjonalna)' })
  @IsOptional()
  @IsDateString()
  End_date?: string;
}