import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail({}, { message: "Email must be valid" })
    email!: string;
    @ApiProperty()
    @IsString({ message: "Password must be a string" })
    password!: string
}
