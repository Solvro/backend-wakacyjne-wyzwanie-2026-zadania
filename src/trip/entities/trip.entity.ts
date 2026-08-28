import { ApiProperty } from '@nestjs/swagger';

export class Trip {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}
