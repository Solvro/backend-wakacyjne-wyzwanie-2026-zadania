import { ApiProperty } from "@nestjs/swagger";
import {Status} from "@prisma/client"
import { IsDateString, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { execArgv } from "process";

export class CreateTripDto {
    @ApiProperty({
      example: "The name of the trip."
    })
    @IsString({message: 'must be string'})
    @IsNotEmpty({message: 'must contain something'})
    @MaxLength(100)
  	name!: string;   
    
    @ApiProperty({
      example: "The start date of the trip."
    })
    @IsDateString()
  	startDate!: Date;  
    
    @ApiProperty({
      example: "The end date of the trip."
    })
    @IsDateString()
  	endDate!: Date; 
    
    @ApiProperty({
      example: "The current status of the trip."
    })
    @IsEnum(Status)
  	status!: Status;              
}
