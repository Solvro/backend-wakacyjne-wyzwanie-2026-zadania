import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "generated/prisma/enums";
import { IsString, IsNotEmpty, IsInt, Min, Max, IsEnum } from "class-validator";

export class CreateParticipantDto {
  @ApiProperty({
    example: "Jan Kowalski",
    description: "The full name of the participant",
  })
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name can not be empty" })
  name: string;

  @ApiProperty({
    example: 25,
    description: "The age of the participant (must be between 0 and 120)",
  })
  @IsInt({ message: "Age must be an intiger" })
  @Min(0, { message: "Age can not be a negative number" })
  @Max(120, { message: "Age must be below or equal to 120" })
  age: number;

  @ApiProperty({
    enum: Gender,
    description: "The gender of the participant",
  })
  @IsEnum(Gender, { message: "Gender must be a correct enum value" })
  gender: Gender;
}
