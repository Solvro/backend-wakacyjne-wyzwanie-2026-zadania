import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundError } from 'rxjs';


@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) {}
  
  async create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.expense.create({
      data: {
        description: createExpenseDto.description,
        price: createExpenseDto.price,
        category: createExpenseDto.category,
        trip_id: createExpenseDto.tripId
      }
    });
  }

  async findAll() {
    return this.databaseService.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.databaseService.expense.findUnique({
      where: {
        id
      }
    })
    
    if(!expense) {
      throw new NotFoundException("No expense found with the given ID")
    };
  }

  async update(id: number, UpdateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.databaseService.expense.update({
      where: {
        id
      },
      data: {
        description: UpdateExpenseDto.description,
        price: UpdateExpenseDto.price,
        category: UpdateExpenseDto.category,
        trip_id: UpdateExpenseDto.tripId
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: {
        id
      }
    })
  }
}
