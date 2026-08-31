import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan Kowalski' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'jan@example.com' })
  @IsEmail()
  email!: string;
}