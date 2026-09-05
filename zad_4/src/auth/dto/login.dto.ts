import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "contact@example.com",
    description: "Unique email of the user",
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "i-DO-pieca67",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
