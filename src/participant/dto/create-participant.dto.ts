import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Alex Morgan' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'alex.morgan@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  tripId!: number;

  @ApiPropertyOptional({ example: '+15550192834' })
  @IsOptional()
  @IsString()
  phone?: string;
}