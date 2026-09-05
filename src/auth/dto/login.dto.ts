import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Incorrect email format' })
    @IsNotEmpty({ message: 'Email is needed' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is needed' })
    password: string;
}