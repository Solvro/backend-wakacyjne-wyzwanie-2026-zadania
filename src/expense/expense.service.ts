import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const { id_participant, id_trip } = createExpenseDto;

    const participantExists = await this.dataBaseService.participant.findUnique({
      where: { id: id_participant },
    });

    if (!participantExists) {
      throw new NotFoundException(`Participant with ID ${id_participant} not found`);
    }

    const tripExists = await this.dataBaseService.trip.findUnique({
      where: { id: id_trip },
    });

    if (!tripExists) {
      throw new NotFoundException(`Trip with ID ${id_trip} not found`);
    }

    return this.dataBaseService.expense.create({ 
      data: {
        id_participant: createExpenseDto.id_participant,
        id_trip: createExpenseDto.id_trip,
        amount: createExpenseDto.amount,
        currency: createExpenseDto.currency,
        date: createExpenseDto.date
      } 
    });
  }

  async findAll() {
    return this.dataBaseService.expense.findMany();
  }

  async findOne(id: number) {
    const expense = await this.dataBaseService.expense.findUnique({
      where: { id: id },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);
    return this.dataBaseService.expense.update({
      where: { id: id },
      data: {
        id_participant: updateExpenseDto.id_participant,
        id_trip: updateExpenseDto.id_trip,
        amount: updateExpenseDto.amount,
        currency: updateExpenseDto.currency,
        date: updateExpenseDto.date
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.dataBaseService.expense.delete({
      where: { id: id },
    });
  }
}
