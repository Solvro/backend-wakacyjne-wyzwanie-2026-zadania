import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto{
    @IsEmail()
    email!: string;
    
    @IsNotEmpty({ message: 'Hasło jest wymagane' })
    @MinLength(10, { message: 'Hasło musi mieć co najmniej 10 znaków' })
    password!: string
}

export class LoginDto{
    @IsEmail()
    email!: string;
    
    @IsNotEmpty({ message: 'Hasło jest wymagane' })
    @MinLength(10, { message: 'Hasło musi mieć co najmniej 10 znaków' })
    password!: string
}