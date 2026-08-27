import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Wycieczka w góry', maxLength: 25 })
  @IsString()
  @MaxLength(25)
  title!: string;

  @ApiPropertyOptional({ example: 'Wyjazd integracyjny', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;

  @ApiProperty({ example: '2026-06-01T00:00:00.000Z' })
  @IsDateString()
  start_date!: string;

  @ApiProperty({ example: '2026-06-07T00:00:00.000Z' })
  @IsDateString()
  end_date!: string;
}
