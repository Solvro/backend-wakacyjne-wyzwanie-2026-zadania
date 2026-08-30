import { IsString, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  tripId!: number;
}