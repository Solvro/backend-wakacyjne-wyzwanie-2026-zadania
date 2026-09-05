import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'email must be a string' })
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  @MaxLength(50, {
    message: 'email must be at most 50 characters in length',
  })
  email!: string;

  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, {
    message: 'password must be at least 8 characters in length',
  })
  password!: string;
}
