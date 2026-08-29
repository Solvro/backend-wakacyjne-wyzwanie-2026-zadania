import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: 'Wakacje w Grecji', description: 'Nazwa wycieczki' })
  @IsString()
  @IsNotEmpty()
  Trip_Name!: string;

  @ApiProperty({ example: 'Santorini', description: 'Cel podróży' })
  @IsString()
  @IsNotEmpty()
  Destination!: string;

  @ApiProperty({
    example: '2026-07-01T00:00:00.000Z',
    description: 'Data rozpoczęcia (ISO Date)',
  })
  @IsDateString()
  @IsNotEmpty()
  Start_Date!: string;

  @ApiProperty({
    example: '2026-07-14T00:00:00.000Z',
    description: 'Data zakończenia (ISO Date)',
  })
  @IsDateString()
  @IsNotEmpty()
  End_Date!: string;
}
