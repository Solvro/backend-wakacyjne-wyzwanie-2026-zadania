import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsPositive,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
} from "class-validator";

export class CreateExpenseDto {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the trip",
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  tripId: number;

  @ApiProperty({
    example: 1,
    description: "The unique identifier of the participant",
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  participantId: number;

  @ApiProperty({
    example: 145.5,
    description: "The cost/value of the expense (up to 2 decimal places)",
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: true,
    description: "Indicates whether the expense includes transport costs",
  })
  @IsBoolean()
  @IsNotEmpty()
  includesTransport: boolean;

  @ApiProperty({
    example: "2026-08-29T12:00:00Z",
    description: "ISO 8601 timestamp of when the expense occurred",
  })
  @IsDateString()
  @IsNotEmpty()
  timestamp: string;
}
