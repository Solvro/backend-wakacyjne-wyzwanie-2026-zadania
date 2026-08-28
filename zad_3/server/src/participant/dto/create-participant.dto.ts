import { Gender } from "generated/prisma/enums";
import { IsString, IsNotEmpty, IsInt, Min, Max, IsEnum } from "class-validator";
export class CreateParticipantDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name can not be empty" })
  name: string;

  @IsInt({ message: "Age must be an intiger" })
  @Min(0, { message: "Age can not be a negative number" })
  @Max(120, { message: "Age must be below or equal to 120" })
  age: number;

  @IsEnum(Gender, { message: "Gender must be a correct enum value" })
  gender: Gender;
}
