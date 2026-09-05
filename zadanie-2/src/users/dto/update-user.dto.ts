import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters long." })
    password?: string
}