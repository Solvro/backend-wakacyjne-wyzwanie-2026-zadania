import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {DatabaseService} from '../database/database.service';
import {Expense} from './entities/expense.entity'; 

@Injectable()
export class ExpenseService {

  constructor(private databaseService: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {

    return this.databaseService.expense.create({
      data: {
        type: createExpenseDto.type,
        amount: createExpenseDto.amount,
        trip: {
          connect: {
            id: createExpenseDto.tripId,
          }
        }
      }
    });
  }

  async findAll() {
    return this.databaseService.expense.findMany({
      include: {
        trip: {
          include: {
            participants: true,
          }
        }
      }
    });
  }

  async findOne(id: number): Promise<Expense> {

    const expense = await this.databaseService.expense.findUnique({
      where: {id},
      include: {
        trip: {
          include: {
            participants: true,
          }
        }
      }
    })

    if( ! expense){
      throw new NotFoundException('Expense with id ${id} not found');
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {

    await this.findOne(id);

    return this.databaseService.expense.update({
      where: {id},
      data: {
        type: updateExpenseDto.type,
        amount: updateExpenseDto.amount,
        trip: {
          connect: {
            id: updateExpenseDto.tripId,
          }
        }
      }
    })
  }

  async remove(id: number): Promise<Expense> {
 
    await this.findOne(id);

    return this.databaseService.expense.delete({
      where: {id}
    });
  }
}

