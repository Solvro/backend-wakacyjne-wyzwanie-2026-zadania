import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.expense.create({
      data:{
        price: createExpenseDto.price,
        paid_by_id: createExpenseDto.paid_by_id,
        date: new Date(createExpenseDto.date),
        description: createExpenseDto.description,
      }
    })
  }

  async findAll() {
    return this.databaseService.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: { expense_id: id}
    })

    if (!expense) {
      throw new NotFoundException("No expense with this id")
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.databaseService.expense.update({
      where: { expense_id: id },
      data: {
        price: updateExpenseDto.price,
        paid_by_id: updateExpenseDto.paid_by_id,
        date: updateExpenseDto.date ? new Date(updateExpenseDto.date) : undefined,
        description: updateExpenseDto.description,
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.databaseService.expense.delete({
      where: { expense_id: id }
    })
  }
}
