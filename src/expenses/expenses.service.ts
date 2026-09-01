import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import type { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpensesService {
  constructor(private databaseService: DatabaseService) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.expense.create({
      data: {
        id: createExpenseDto.id,
        tripId: createExpenseDto.trip_id,
        name: createExpenseDto.name,
        value: createExpenseDto.value
      }
    });
  }

  findAll() {
    return this.databaseService.expense.findMany();
  }

  findOne(id: number) {
    return this.databaseService.expense.findFirst({
      where: { id }
    });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.databaseService.expense.update({
      where: { id },
      data: {
        tripId: updateExpenseDto.trip_id,
        name: updateExpenseDto.name,
        value: updateExpenseDto.value
      }
    })
  }

  remove(id: number) {
    return this.databaseService.expense.delete({
      where: { id }
    });
  }
}
