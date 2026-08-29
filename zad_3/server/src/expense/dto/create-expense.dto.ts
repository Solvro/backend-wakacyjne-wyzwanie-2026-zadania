import {
  IsInt,
  IsPositive,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
} from "class-validator";

export class CreateExpenseDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  tripId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  participantId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  value: number;

  @IsBoolean()
  @IsNotEmpty()
  includesTransport: boolean;

  @IsDateString()
  @IsNotEmpty()
  timestamp: string;
}
