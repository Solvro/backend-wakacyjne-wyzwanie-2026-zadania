import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UpdateTripDto extends PartialType(CreateTripDto) {
    @ApiProperty()
    @IsString({ message: "Name must be a string" })
    name!: string;
    @ApiProperty()
    @IsString({ message: "Description must be a string" })
    description?: string;
    @ApiProperty()
    @IsDate({ message: "Start time must be a date" })
    start_time!: Date;
    @ApiProperty()
    @IsDate({ message: "End time must be a date" })
    end_time!: Date;
}
