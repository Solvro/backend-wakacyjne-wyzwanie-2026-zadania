import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, MaxLength, Min } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan', maxLength: 20 })
  @IsString()
  @MaxLength(20)
  name!: string;

  @ApiProperty({ example: 'Kowalski', maxLength: 20 })
  @IsString()
  @MaxLength(20)
  surname!: string;

  @ApiProperty({ example: '123456789', maxLength: 10 })
  @IsString()
  @MaxLength(10)
  phone!: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}
