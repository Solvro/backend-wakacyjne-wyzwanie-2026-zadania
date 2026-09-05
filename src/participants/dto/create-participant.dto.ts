import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsInt, IsString, IsEmail, Min } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan Kowalski' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'jan.kowalski@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ enum: Role, example: Role.Owner })
  @IsEnum(Role)
  role: Role;
}