import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Jan Kowalski', description: 'Imię i nazwisko uczestnika' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ enum: Role, enumName: 'Role', default: Role.MEMBER, description: 'Rola w wyjeździe' })
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @ApiProperty({ example: 1, description: 'ID wyjazdu, do którego przypisany jest uczestnik' })
  @IsInt()
  @IsNotEmpty()
  tripId: number;
}