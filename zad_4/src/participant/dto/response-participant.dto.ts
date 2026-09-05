import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Gender } from "generated/prisma/enums";

export class ParticipantResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "Jan Kowalski" })
  name: string;

  @ApiProperty({ enum: Gender })
  gender: Gender;

  // hide age, show isAdult instead
  @Exclude()
  age: number;

  @ApiProperty({
    example: true,
    description: "Returns true if participant's age is >= 18",
  })
  @Expose()
  get isAdult(): boolean {
    return this.age >= 18;
  }
}
