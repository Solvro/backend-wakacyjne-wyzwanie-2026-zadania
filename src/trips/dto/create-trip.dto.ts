import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Wyjazd do Karpacza' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Wyprawa na Śnieżkę' })
  @IsString()
  description: string;

  @ApiProperty({ example: 500, minimum: 0 })
  @IsNumber()
  @Min(0)
  costPln: number;
}