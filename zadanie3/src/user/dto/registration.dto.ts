import { IsString, IsNotEmpty, IsEmail, IsDate, MaxDate} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import { Type, Expose, Exclude } from 'class-transformer';

export class RegistrationDto {

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

    @Exclude()
    @Type( () => Date)
    @IsDate()
    @MaxDate( () => new Date(), {message: "Date must be today or before"})
    @ApiProperty({
            description: 'The date of birth of the user',
            example: '2009-02-14'
    })
    date_of_birth!: Date

}