import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty({
    description: 'The name of the participant',
    example: 'Jan Kowalski',
  })
  name!: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The email of the participant',
    example: 'jankowalski@poczta.pl',
  })
  email?: string;
}
