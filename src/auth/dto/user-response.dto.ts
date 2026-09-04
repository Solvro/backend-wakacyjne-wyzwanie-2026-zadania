import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: 'jan.kowalski@example.com' })
    email!: string;

    @ApiProperty({ example: '2026-08-28T10:00:00.000Z' })
    createdAt!: string;
}