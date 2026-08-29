import {IsInt, IsNotEmpty, Min, IsDateString, IsNumber, IsPositive} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'amount must be a valid number with max 2 decimal places!' })
    @IsNotEmpty({message: "amount is required!"})
    @IsPositive({message: "amount must be a positive number!"})
    @ApiProperty({
        description: "Amount of the money in expense",
        example: 100.0,
    })
    amount!: number;

    @IsDateString({},{message: "date must be in date format!"})
    @IsNotEmpty({message: "date is required!"})
    @ApiProperty({
        description: "Date of expense",
        example: '2026-07-01T08:00:00Z'
    })
    date!: string;

    @Type(() => Number)
    @IsInt({ message: 'participant_id must be an integer!' })
    @IsNotEmpty({message: "participant_id is required!"})
    @Min(0, {message: "participant_id must be positive!"})
    @ApiProperty({
        description: "Id of a participant connected to the expense",
        example: 1
    })
    participant_id!: number;

    @Type(() => Number)
    @IsInt({ message: 'trip_id must be an integer!' })
    @IsNotEmpty({message: "trip_id is required!"})
    @Min(0, {message: "trip_id must be positive!"})
    @ApiProperty({
        description: "Id of a trip connected to the expense",
        example: 1
    })
    trip_id!: number;
}
