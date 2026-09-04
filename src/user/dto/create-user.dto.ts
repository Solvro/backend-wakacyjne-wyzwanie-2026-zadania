import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEmail, IsString, IsInt} from 'class-validator'
export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    email!: string

    @ApiProperty()
    @IsString()
    hashedPassword!:string

}
