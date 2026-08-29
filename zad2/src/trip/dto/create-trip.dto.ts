import {IsNotEmpty, Min, IsDateString, IsDecimal, IsNumber} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';
import { Type } from "class-transformer";

export class CreateTripDto {
    @IsDateString({}, {message: "trip start date must be a date!"})
    @IsNotEmpty({message: "trip start date is required!"})
    @ApiProperty({
        description: "Dane when the trip starts",
        example: '2026-07-01T08:00:00Z'
    })
    trip_start_date!: Date;

    @IsDateString({}, {message: "trip end date must be a date!"})
    @IsNotEmpty({message: "trip end date is required!"})
    @ApiProperty({
        description: "Dane when the trip ends",
        example: '2026-07-01T18:00:00Z'
    })
    trip_end_date!: Date;

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'cost must be a valid number with max 2 decimal places!' })
    @IsNotEmpty({message: "cost is required!"})
    @Min(0.0, {message: "cost must be a positive number!"})
    @ApiProperty({
        description: "Cost of the trip",
        example: 150.0,
    })
    cost!: number;

    @IsNumber({}, {message: "num_spots must be a number!"})
    @IsNotEmpty({message: "num_spots is required!"})
    @Min(0, {message: "num_spots must be positive!"})
    @ApiProperty({
        description: "Number of spots availavle on the trip",
        example: 50
    })
    num_spots!: number;
}
