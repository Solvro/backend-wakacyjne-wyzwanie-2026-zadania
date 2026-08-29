import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type as TripType } from '@prisma/client';
export class CreateTripDto {
  @ApiProperty({
    example: '2026-08-29T14:46:00Z',
    description: 'Data rozpoczęcia wycieczki',
  })
  @IsDateString()
  start: string;

  @ApiProperty({
    example: '2026-08-29T15:13:00Z',
    description: 'Data końca wycieczki',
  })
  @IsOptional()
  end?: string;

  @ApiProperty({
    enum: TripType,
    example: TripType,
    description: 'Typ wycieczki zagraniczna/krajowa',
  })
  @IsEnum(TripType)
  type: TripType;
}
