import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid Email address' })
  @ApiProperty({example: 'nigga@nogga.com',description: 'Users email must be unique'})
  email!: string;

  @IsNotEmpty()
  @ApiProperty({example: 'nigga123',description:'Users password',minLength:6,})
  @MinLength(6, { message: 'Password need to be min 6 chars long' })
  password!: string;
}