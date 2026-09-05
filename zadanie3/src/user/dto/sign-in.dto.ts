import { IsString, IsNotEmpty, IsEmail} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'

export class SignInDto {

    @Expose()
    @IsString({message: "Email must be a string"})
    @IsEmail()
    @IsNotEmpty({message: "Email can't be empty"})
    @ApiProperty({
        description: 'The email of the user',
        example: 'luis@poczta.pl'
    })
    email!: string

    @Exclude()
    @IsString({message: "Password must be a string"})
    @IsNotEmpty({message: "Password can't be empty"})
    @ApiProperty({
        description: 'The password of the user',
        example: 'pa171*'
    })
    password!: string

}

