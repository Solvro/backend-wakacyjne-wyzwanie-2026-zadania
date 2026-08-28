import { ApiProperty } from '@nestjs/swagger';
import { ExpenseType } from '../../generated/prisma';

export class Expense {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  tripId: number;

  @ApiProperty({ nullable: true, required: false })
  participantId: number | null;

  @ApiProperty({ enum: ExpenseType, nullable: true, required: false })
  type: ExpenseType | null;
}
