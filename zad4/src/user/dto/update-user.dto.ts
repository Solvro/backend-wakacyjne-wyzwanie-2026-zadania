import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid Email address' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password need to be min 6 chars long' })
  password?: string;
}