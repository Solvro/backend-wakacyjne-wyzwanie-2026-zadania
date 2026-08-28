import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripResponseDto {
    @ApiProperty({ description: "The ID of the trip", example: 1 })
    id!: number;

    @ApiProperty({ description: "The name of the trip", example: 'Majówka w górach' })
    name!: string;

    @ApiProperty({ description: "The destination of the trip", example: 'Zakopane' })
    destination!: string;

    @ApiProperty({ description: "The starting date of the trip", example: '2026-05-01' })
    startDate!: string;

    @ApiPropertyOptional({ description: "The ending date of the trip", example: '2026-05-03' })
    endDate!: string;

    @ApiProperty({ description: "The budget of the trip", example: 1500.50 })
    budget!: number;
}