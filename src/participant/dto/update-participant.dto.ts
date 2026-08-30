import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipantDto } from './create-participant.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  email?: string;
}
