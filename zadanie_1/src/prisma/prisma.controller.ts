import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('expenses')
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  // 1. POST: Dodanie nowego wydatku

  @Post()
  async createExpense(
    @Body()
    body: {
      Amount: number;
      Category: string;
      Trip_id: number;
      Participant_id: number;
    },
  ) {
    return this.prisma.expense.create({
      data: {
        Amount: body.Amount,
        Category: body.Category,
        Trip_id: body.Trip_id,
        Participant_id: body.Participant_id,
      },
    });
  }

  // 2. DELETE: Usuwanie wydatku po ID
  @Delete(':id')
  async deleteExpense(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.expense.delete({
      where: { Expense_id: id },
    });
  }
}
