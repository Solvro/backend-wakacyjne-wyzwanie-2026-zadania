import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '../../../generated/prisma/client';

export class Trip {
  @ApiProperty({ example: 1, description: 'Unique identifier of the trip' })
  id: number;

  @ApiProperty({
    example: 'Wakacje w Hiszpanii',
    description: 'Name of the trip',
  })
  name: string;

  @ApiProperty({
    example: 'Barcelona',
    description: 'Destination city or place',
  })
  destination: string;

  @ApiProperty({
    example: '2026-07-10T00:00:00.000Z',
    description: 'Start date of the trip',
  })
  startDate: Date;

  @ApiProperty({
    example: '2026-07-17T00:00:00.000Z',
    description: 'End date of the trip',
  })
  endDate: Date;

  @ApiProperty({
    enum: TripStatus,
    enumName: 'TripStatus',
    example: TripStatus.PLANNED,
    description: 'Current status of the trip',
  })
  status: TripStatus;
}
