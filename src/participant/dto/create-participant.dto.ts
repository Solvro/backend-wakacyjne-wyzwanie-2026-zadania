import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateParticipantDto {
    @ApiProperty({
      example: "Adam",
      description: "The name of the participant."
    })
    @IsString({message: 'must be string'})
    @IsNotEmpty({message: 'must contain something'})
    @MaxLength(100)
 	  nameParticipant!: string;

    @ApiProperty({
      example: "Kowal",
      description: "The surname of the participant."
    })
    @IsString({message: 'must be string'})
    @IsNotEmpty({message: 'must contain something'})
    @MaxLength(100)
  	surnameParticipant!: string;

    @ApiProperty({
      example: "999-999-888",
      description: "The phone number of the participant."
    })
    @IsString({message: 'must be string'})
    @IsNotEmpty({message: 'must contain something'})
    @MaxLength(20)
    @IsPhoneNumber()
  	phone!: string;

    @ApiProperty({
      example: "adam.kowal@interia.pl",
      description: "The e-mail address of the participant."
    })
    @IsString({message: 'must be string'})
    @IsNotEmpty({message: 'must contain something'})
    @MaxLength(100)
    @IsEmail()
  	email?: string;
}
