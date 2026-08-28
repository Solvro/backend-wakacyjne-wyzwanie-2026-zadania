import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsInt, isNotEmpty, IsNotEmpty, IsOptional, isString, IsString, MaxLength } from 'class-validator';

export class CreateParticipantDto {
    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "can't be empty" })
    @MaxLength(50)
    @ApiProperty({
        description: "Name of participant",
        example: "Anna"
    })
    name!: string;

    @IsString({ message: "must be a string" })
    @IsNotEmpty({ message: "can't be empty" })
    @MaxLength(100)
    @ApiProperty({
        description: "Surname of participant",
        example: "Kowalska"
    })
    surname!: string;

    @IsEmail({}, { message: 'must be a valid email' })
    @ApiProperty({
        description: "Participant's email",
        example: "anna.kowalska@example.com"
    })
    email!: string;

    @IsOptional()
    @IsDateString({}, { message: 'must be a valid date (YYYY-MM-DD)' })
    @ApiPropertyOptional({
        description: "Participant's joining date",
        example: "2026-05-01T00:00:00.000Z"
    })
    joinedAt?: string;

    @IsInt({ message: 'must be an integer' })
    @ApiProperty({
        description: "Identifying number of a trip",
        example: "1"
    })
    tripId!: number;
}
