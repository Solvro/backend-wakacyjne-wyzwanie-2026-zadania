import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from 'database/database.service';

@Injectable()
export class ExpenseService {

  constructor(private databaseService: DatabaseService){}

  async create(createExpenseDto: CreateExpenseDto){
    return this.databaseService.expense.create({
      data:{
        amount: createExpenseDto.amount,
        date: createExpenseDto.date,
        participant_id: createExpenseDto.participant_id,
        trip_id: createExpenseDto.trip_id
      }
    })
  }

  async findAll() {
    return this.databaseService.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: {id}
    });

    if(!expense){
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.databaseService.expense.update({
      where: {id},
      data:{
        amount: updateExpenseDto.amount,
        date: updateExpenseDto.date,
        participant_id: updateExpenseDto.participant_id,
        trip_id: updateExpenseDto.trip_id
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: {id}
    });
  }
}
