import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  email?: string;
}
