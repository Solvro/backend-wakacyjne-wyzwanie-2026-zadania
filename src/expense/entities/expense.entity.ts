import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '../../../generated/prisma/client';

export class Expense {
  @ApiProperty({ example: 1, description: 'Unique identifier of the expense' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the associated trip' })
  tripId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the participant who paid',
  })
  participantId: number;

  @ApiProperty({ example: 'Obiad', description: 'Title of the expense' })
  title: string;

  @ApiProperty({ example: 89.99, description: 'Amount of the expense' })
  amount: number;

  @ApiProperty({
    enum: ExpenseCategory,
    enumName: 'ExpenseCategory',
    example: ExpenseCategory.FOOD,
    description: 'Category of the expense',
  })
  category: ExpenseCategory;

  @ApiProperty({
    example: 'Restauracja przy plaży',
    description: 'Description of the expense',
  })
  description: string;

  @ApiProperty({
    example: '2026-07-10T14:30:00.000Z',
    description: 'Date and time the expense was created',
  })
  createdAt: Date;
}
