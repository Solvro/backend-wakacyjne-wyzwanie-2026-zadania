import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({
    description: 'Email',
    example: 'jan@example.com',
  })
  email!: string;

  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({
    description: "Password of the user's account",
    example: 'changeme',
  })
  password!: string;
}
