import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTripDto {
    @ApiProperty({ example: '2026-09-01T00:00:00.000Z', description: 'Trip start date' })
    @Type(()=>Date)
    @IsDate({message: 'startDate must be proper date'})
    @IsNotEmpty()
    startDate!: Date;

    @ApiProperty({ example: '2026-09-10T00:00:00.000Z', description: 'Trip end date' })
    @Type(()=>Date)
    @IsDate({message: 'endDate must be proper date'})
    @IsNotEmpty()
    endDate!: Date;

    @ApiProperty({ example: 'Rome', description: 'City name' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    city!: string;

    @ApiProperty({ example: 'Italy', description: 'Country name' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    country!: string;
}
