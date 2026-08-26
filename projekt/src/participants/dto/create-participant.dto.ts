import { IsNotEmpty, IsString, MaxLength, IsOptional, IsEmail, IsInt } from "class-validator";

export class CreateParticipantDto {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  lastName!: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsInt()
  tripId!: number;
}