import { Injectable, NotFoundException} from '@nestjs/common';
import { DatabaseService } from "../database/database.service";
import { Expense } from "@prisma/client";
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.databaseService.expense.create({
      data: {
        trip_id: createExpenseDto.trip_id,
        payer_id: createExpenseDto.payer_id,
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        description: createExpenseDto.description,
        created_at: createExpenseDto.created_at,
      },
    });
  }

  async findAll(): Promise<Expense[]> {
    return this.databaseService.expense.findMany();
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.databaseService.expense.findUnique({
      where: { id },
    });
    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    await this.findOne(id);
    return this.databaseService.expense.update({
      where: { id },
      data: {
        trip_id: updateExpenseDto.trip_id,
        payer_id: updateExpenseDto.payer_id,
        amount: updateExpenseDto.amount,
        category: updateExpenseDto.category,
        description: updateExpenseDto.description,
        created_at: updateExpenseDto.created_at,
      },
    });
  }

  async remove(id: number): Promise<Expense> {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: { id },
    });
  }
}
