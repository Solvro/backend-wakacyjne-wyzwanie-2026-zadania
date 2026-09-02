import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto{
    @ApiProperty({example: 'piotr.nowak@gmail.com', description: 'Uniqe email address'})
    @IsEmail({}, {message: 'Insert valid email'})
    @IsNotEmpty({message: "Email can't be empty"})
    email!: string

    @ApiProperty({ example: 'haslo123', description: 'User password (atleast 8 characters)' })
    @IsString()
    @IsNotEmpty({ message: "Password can't be empty" })
    @MinLength(6, { message: 'Password must be atleast 8 characters long' })
    password!: string;
}