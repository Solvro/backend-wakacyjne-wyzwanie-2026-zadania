import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsDateString, IsNumber, IsOptional} from 'class-validator'

export class CreateTripDto {
    
    @ApiProperty()
    @IsString()
    destination!: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?:string;

    @ApiProperty()
    @IsDateString()
    startDate!: string;

    @ApiProperty()
    @IsDateString()
    endDate!:string;

    @ApiProperty()
    @IsNumber()
    budget!:number;

}
