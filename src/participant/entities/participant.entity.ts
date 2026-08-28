import { ApiProperty } from '@nestjs/swagger';

export class Participant {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  budget: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true, required: false })
  phone: string | null;
}
