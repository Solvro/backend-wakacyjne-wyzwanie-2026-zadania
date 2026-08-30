import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from 'src/generated/prisma/enums';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Wakacje we Włoszech', description: 'Trip name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ example: 'Rzym', description: 'Trip destination city' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  destination?: string;

  @ApiProperty({
    example: 'Tydzień zwiedzania Włoch',
    description: 'Trip description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2026-09-01T00:00:00.000Z',
    description: 'Trip start date',
  })
  @Type(() => Date)
  @IsDate({ message: 'start_date must be a proper date' })
  @IsNotEmpty()
  start_date!: Date;

  @ApiProperty({
    example: '2026-09-10T00:00:00.000Z',
    description: 'Trip end date',
  })
  @Type(() => Date)
  @IsDate({ message: 'end_date must be a proper date' })
  @IsNotEmpty()
  end_date!: Date;

  @ApiProperty({
    enum: TripStatus,
    example: TripStatus.notStarted,
    description: 'Trip status',
  })
  @IsEnum(TripStatus)
  @IsNotEmpty()
  status!: TripStatus;
}
