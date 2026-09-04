import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid!: string;

  @ApiProperty({ example: 'jan.kowalski@example.com' })
  email!: string;

  @ApiProperty({ example: 'Jan' })
  name!: string;

  @ApiProperty({ example: 'Kowalski' })
  surname!: string;

  @ApiProperty({ example: null, nullable: true, required: false })
  phone?: string | null;

  @ApiProperty({ example: '2026-09-04T20:30:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-09-04T20:30:00.000Z' })
  updatedAt!: Date;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: null, nullable: true, required: false })
  deletedAt?: Date | null;
}
