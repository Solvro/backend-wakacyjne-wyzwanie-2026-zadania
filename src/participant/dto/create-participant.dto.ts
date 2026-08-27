import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEmail, IsString, IsInt} from 'class-validator'
export class CreateParticipantDto {

    @ApiProperty()
    @IsString()
    firstName!:string

    @ApiProperty()
    @IsString()
    lastName!:string

    @ApiProperty()
    @IsEmail()
    email!:string

    @ApiProperty()
    @IsDateString()
    dateJoined!: string

    @ApiProperty()
    @IsInt()
    tripId!:number

}
