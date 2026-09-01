import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateTripDto {
    @ApiProperty()
    @IsNumber({}, { message: "ID must be a number" })
    id!: number;
    @ApiProperty()
    @IsString({ message: "Name must be a string" })
    name!: string;
    @ApiProperty()
    @IsString({ message: "Description must be a string" })
    description?: string;
    @ApiProperty()
    @IsDate({ message: "Start time must be a date" })
    start_time!: Date;
    @ApiProperty()
    @IsDate({ message: "End time must be a date" })
    end_time!: Date;
}
