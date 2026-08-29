import { ApiProperty } from '@nestjs/swagger';

export class Participant {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the participant',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the associated trip',
  })
  tripId: number;

  @ApiProperty({
    example: 'Jan',
    description: 'First name of the participant',
  })
  firstName: string;

  @ApiProperty({
    example: 'Kowalski',
    description: 'Last name of the participant',
  })
  lastName: string;

  @ApiProperty({
    example: 'jan@example.com',
    description: 'Email address of the participant',
  })
  email: string;

  @ApiProperty({
    example: '2026-07-10T12:00:00.000Z',
    description: 'Date and time the participant joined',
  })
  joinedAt: Date;
}
