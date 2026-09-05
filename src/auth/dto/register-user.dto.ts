import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";

export class RegisterDto {
    @IsEmail({}, {message: 'Incorrect email format'})
    @IsNotEmpty({message: 'Email is needed'})
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password length should be at least 6 characters' })
    password: string;

    @IsString()
    @IsOptional()
    name?: string;

}