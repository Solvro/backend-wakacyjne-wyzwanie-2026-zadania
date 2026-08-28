import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan Kowalski' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  tripId!: number;
}