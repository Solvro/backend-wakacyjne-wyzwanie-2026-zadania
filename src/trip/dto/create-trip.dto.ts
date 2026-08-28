import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsDateString, IsNotEmpty } from "class-validator";

export class CreateTripDto {
    @ApiProperty({ example: 'Italy', description: 'Lokalizacja wycieczki' })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({ example: '2026-08-22', description: 'Data rozpoczęcia wycieczki'})
    @IsDateString()
    start: string;

    @ApiProperty({ example: '2026-09-18', description: 'Data zakończenia wycieczki'})
    @IsDateString()
    end: string;    
}
