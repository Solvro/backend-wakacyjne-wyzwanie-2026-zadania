import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateTripDto {

    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "must not be empty" })
    @MaxLength(75)
    @ApiProperty({
        description: "Trip's name",
        example: "Majówka w górach"
    })
    name!: string;

    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "must not be empty" })
    @MaxLength(50)
    @ApiProperty({
        description: "Trip's destination",
        example: "Zakopane"
    })
    destination!: string;

    @IsDateString({}, { message: 'must be a valid date (YYYY-MM-DD)' })
    @ApiProperty({
        description: "Trip's starting date",
        example: "2026-05-01"
    })
    startDate!: string;

    @IsDateString({}, { message: 'must be a valid date (YYYY-MM-DD)' })
    @ApiProperty({
        description: "Trip's ending date",
        example: "2026-05-03"
    })
    endDate!: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: "Trip's budget",
        example: "1500.50"
    })
    budget!: number;
}
