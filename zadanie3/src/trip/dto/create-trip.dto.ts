import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTripDto {
  @ApiProperty({ example: 'Włochy 2026', description: 'Cel wyjazdu' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: '2026-07-01T00:00:00.000Z', description: 'Data rozpoczęcia wyjazdu' })
  @Type(() => Date)
  @IsDate()
  startDate: Date;
}