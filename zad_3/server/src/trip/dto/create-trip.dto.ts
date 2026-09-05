import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Paryż",
    description: "The destination of the trip",
  })
  destination: string;

  @ApiProperty({
    example: "2026-10-15T09:00:00Z",
    description: "ISO 8601 timestamp of the trip date",
  })
  @IsDateString()
  date: string;
}
