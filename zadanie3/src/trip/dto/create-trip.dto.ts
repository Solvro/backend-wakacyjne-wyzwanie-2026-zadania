import {City, Food} from '../../generated/prisma/enums'
import {IsEnum, IsArray,IsOptional} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import { Expose } from 'class-transformer';

export class CreateTripDto {

    @Expose()
    @IsEnum(City, {message: "City must be selected from: WARSAW, SEOUL, PARIS, TOKYO, SZANGHAI, SINGAPORE"})
    @ApiProperty({
        enum: ['WARSAW', 'SEOUL','PARIS','TOKYO','SZANGHAI', 'SINGAPORE'],
        description: 'The city selected from: WARSAW, SEOUL, PARIS, TOKYO, SZANGHAI, SINGAPORE',
        example: 'SZANGHAI'
    })
    city!: City

    @Expose()
    @IsEnum(Food, {message: "Food must be selected from: ALL_INCLUSIVE, MEALS_3, MEALS_2, BREAKFAST, WITHOUT"})
    @ApiProperty({
        enum: ['ALL_INCLUSIVE', 'MEALS_3','MEALS_2','BREAKFAST','WITHOUT'],
        description: 'The food selected from: ALL_INCLUSIVE, MEALS_3, MEALS_2, BREAKFAST, WITHOUT',
        example: 'WITHOUT'
    })
    food!: Food

    @Expose()
    @IsOptional()
    @IsArray()
    @ApiProperty({
        description: 'The list of participants IDs',
        example: '[2,6]'
    })
    participantsId?: number[]

}

