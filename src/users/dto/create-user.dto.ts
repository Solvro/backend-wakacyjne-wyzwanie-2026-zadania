import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  @MaxLength(50, {
    message: 'username must be at most 50 characters in length',
  })
  username!: string;

  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, {
    message: 'password must be at least 8 characters in length',
  })
  password!: string;
}
