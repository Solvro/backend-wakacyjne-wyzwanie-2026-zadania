import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from 'src/database/database.service';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}

  // async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
  //   return this.databaseService.expense.create({
  //     data: {
  //       description: createExpenseDto.description,
  //     },
  //   });
  // }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
