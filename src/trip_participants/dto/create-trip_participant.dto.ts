import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTripParticipantDto {
    @ApiProperty()
    @IsNumber({}, { message: "Trip ID must be a number" })
    trip_id!: number;
    @ApiProperty()
    @IsNumber({}, { message: "Person ID must be a number" })
    person_id!: number;
}
