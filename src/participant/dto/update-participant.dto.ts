import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipantDto } from './create-participant.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The name of the participant',
    example: 'Jan Kowalski',
  })
  name?: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The email of the participant',
    example: 'jankowalski@poczta.pl',
  })
  email?: string;
}
