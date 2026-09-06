import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsInt, IsPositive } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan Kowalski' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'jan@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  tripId: number;
}
