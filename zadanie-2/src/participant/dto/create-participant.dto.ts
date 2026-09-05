import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateParticipantDto {
    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @MaxLength(60)
    @ApiProperty({
        description: "First name of a participant",
        example: "John"
    })
    firstName!: string;

    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @MaxLength(60)
    @ApiProperty({
        description: "Last name of a participant",
        example: "Kowalski"
    })
    lastName!: string;

    @IsOptional()
    @IsString({ message: "must be a string" })
    //by pasport standards the passport number is either 8 or 9 characters long
    @MinLength(8)
    @MaxLength(9)
    @ApiPropertyOptional({
        description: "Serial number of a passport document",
        example: "XX123456"
    })
    passportNumber?: string;

    @IsInt({ message: "must be an integer" })
    @IsNotEmpty({ message: "the field can't be empty" })
    @ApiProperty({
        description: "Id of a trip that a participant is taking part in",
        example: "5"
    })
    tripId!: number;
}
