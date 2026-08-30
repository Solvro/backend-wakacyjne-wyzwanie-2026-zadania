import { IsString, IsNotEmpty, IsNumber, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '@prisma/client'; 

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tytuł wycieczki', example: 'Morze' })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Miejsce docelowe', example: 'Jastarnia' })
  place!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ description: 'Data rozpoczęcia wycieczki', example: '2026-07-01' })
  start!: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ description: 'Data zakończenia wycieczki', example: '2026-07-10' })
  end!: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Planowany koszt', example: 3000.0 })
  cost!: number;

  @IsEnum(TripStatus)
  @IsNotEmpty()
  @ApiProperty({ description: 'Status wyjazdu', enum: TripStatus, example: TripStatus.PLANNED })
  status!: TripStatus;
}