import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'jan.kowalski@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email!: string;

  @ApiProperty({
    example: 'Jan',
    description: 'User first name',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name!: string;

  @ApiProperty({
    example: 'Kowalski',
    description: 'User last name',
  })
  @IsString({ message: 'Surname must be a string' })
  @IsNotEmpty({ message: 'Surname should not be empty' })
  surname!: string;

  @ApiPropertyOptional({
    example: '+48123456789',
    description: 'User phone number',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  phone?: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'User password',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @ApiProperty({ example: true, default: true })
  @IsBoolean()
  isActive?: boolean;
}
