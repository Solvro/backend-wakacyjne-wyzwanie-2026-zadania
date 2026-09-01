import { IsString, IsDateString, IsNumber, Min, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTripDto {

    @IsString()
    @MaxLength(100)
    @ApiProperty({ description: 'The destination of the trip', example: 'Paris' })
    destination!: string;

    @IsDateString()
    @ApiProperty({ description: 'The date of the trip', example: '2023-10-10' })
    date_of_trip!: Date;

    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'The price of the trip', example: 1000 })
    price!: number;

    @IsString()
    @MaxLength(100)
    @ApiProperty({ description: 'The type of the trip', example: 'Relaxation' })
    type_of_trip!: string;
}
