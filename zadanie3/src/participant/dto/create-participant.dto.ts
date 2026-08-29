import {Diet} from '../../generated/prisma/enums'
import {IsOptional, IsString, IsNotEmpty, IsEnum, IsArray, ArrayNotEmpty, MaxDate, IsDate} from 'class-validator'
import { Type } from 'class-transformer'
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export class CreateParticipantDto {

    @IsString({message: "Name must be a string"})
    @IsNotEmpty({message: "Name can't be empty"})
    @ApiProperty({
        description: 'The name of the participant',
        example: 'Luis'
    })
    name!: string

    @IsString({message: "Surname must be a string"})
    @IsNotEmpty({message: "Name can't be empty"})
    @ApiProperty({
        description: 'The surname of the participant',
        example: 'Lim'
    })
    surname!: string

    @IsOptional()
    @IsEnum(Diet, {message: "Diet must be selected from: VEGETARIAN, VEGAN, GLUTEN_FREE, LACTOSE_FREE"})
    @ApiPropertyOptional({
        enum: ['VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'LACTOSE_FREE'],
        description: 'The diet of the participant selected from: VEGETARIAN, VEGAN, GLUTEN_FREE, LACTOSE_FREE',
        example: 'GLUTEN_FREE'
    })
    diet?: Diet

    @Type( () => Date)
    @IsDate()
    @MaxDate( () => new Date(), {message: "Date must be today or before"})
    @ApiProperty({
        description: 'The date of birth of the participant',
        example: '2009-02-14'
    })
    date_of_birth!: Date

    @IsArray()
    @ArrayNotEmpty({message: "TripsId can't be empty"})
    @ApiProperty({
        description: 'The list of trips IDs',
        example: '[3,5]'
    })
    tripsId!: number[]

}

