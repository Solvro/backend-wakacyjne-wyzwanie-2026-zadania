import {IsString, IsNotEmpty, IsDateString, IsEnum} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class CreateParticipantDto {

    @IsString({message: "first name must be a string!"})
    @IsNotEmpty({message: "first name is required!"})
    @ApiProperty({
        description: "First name of the participant",
        example: 'John',
    })
    first_name!: string;

    @IsString({message: "last name must be a string!"})
    @IsNotEmpty({message: "last name is required!"})
    @ApiProperty({
        description: "Last name of the participant",
        example: 'Krasinski',
    })
    last_name!: string;

    @IsDateString({}, { message: 'date_of_birth must be a valid date!' })
    @IsNotEmpty()
    @ApiProperty({
        description: "Date of birth of a participant",
        example: '1998-05-15T00:00:00.000Z'
    })
    date_of_birth!: Date;

    @IsEnum(Gender, {message: "gender must be 'MALE' or 'FEMALE'!"})
    @IsNotEmpty({message: "gender is required!"})
    @ApiProperty({
        description: "Gender of the participant",
        enum: Gender,
        example: 'MALE'
    })
    gender!: Gender;
    
}
