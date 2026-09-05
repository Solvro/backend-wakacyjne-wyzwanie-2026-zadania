import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTripDto {
    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @MaxLength(120)
    @ApiProperty({
        description: "Destination of the trip",
        example: "Athens, Greece"
    })
    destination!: string;

    @Type(() => Date)
    @IsDate({ message: "must be in date format" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @ApiProperty({
        description: "Starting date of the trip in ISO 8601 format",
        example: "2026-09-01T10:00:00.000Z" 
    })
    startDate!: Date;

    @Type(() => Date)
    @IsDate({ message: "must be in date format" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @IsOptional()
    @ApiPropertyOptional({ 
    description: 'End date of the trip in ISO 8601 format', 
    example: '2026-09-10T18:00:00.000Z' 
    })
    endDate?: Date;
}
