import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantResponseDto {
    @ApiProperty({ description: "The ID of the participant", example: 1 })
    id!: number;

    @ApiProperty({ description: "The name of the participant", example: 'Anna' })
    name!: string;

    @ApiProperty({ description: "The surname of the participant", example: 'Kowalska' })
    surname!: string;

    @ApiProperty({ description: "The email of the participant", example: 'anna.kowalska@example.com' })
    email!: string;

    @ApiPropertyOptional({ description: "The date of joining of the participant", example: '2026-05-01T00:00:00.000Z' })
    joinedAt?: string;

    @ApiProperty({ description: "The trip ID of the participant", example: 1 })
    tripId!: number;
}