import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from 'src/database/database.service';
import { Expense } from 'src/generated/prisma/client';
import e from 'express';

@Injectable()
export class ExpenseService {
  constructor(private databaseService: DatabaseService) { }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const trip = await this.databaseService.trip.findUnique({
      where: { id: createExpenseDto.tripId },
    });
    if (!trip) {
      throw new NotFoundException(
        `Trip with this ID not found`,
      );
    }

    const payer = await this.databaseService.participant.findUnique({
      where: { id: createExpenseDto.payerId },
    });
    if (!payer) {
      throw new NotFoundException(
        `Participant with this ID not found`,
      );
    }
    return this.databaseService.expense.create({
      data: {
        title: createExpenseDto.title,
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        createdAt: createExpenseDto.createdAt,
        note: createExpenseDto.note,
        tripId: createExpenseDto.tripId,
        payerId: createExpenseDto.payerId
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
    if (!expense) {
      throw new NotFoundException("No expense with this id found in DB")
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id);

    if (updateExpenseDto.tripId !== undefined) {
      const trip = await this.databaseService.trip.findUnique({
        where: { id: updateExpenseDto.tripId },
      });
      if (!trip) {
        throw new NotFoundException(
          `Trip with this ID not found`,
        );
      }
    }

    if (updateExpenseDto.payerId !== undefined) {
      const payer = await this.databaseService.participant.findUnique({
        where: { id: updateExpenseDto.payerId },
      });
      if (!payer) {
        throw new NotFoundException(
          `Participant with this ID not found`,
        );
      }
    }
    return this.databaseService.expense.update({
      where: { id },
      data: {
        title: updateExpenseDto.title,
        amount: updateExpenseDto.amount,
        category: updateExpenseDto.category,
        createdAt: updateExpenseDto.createdAt,
        note: updateExpenseDto.note,
        tripId: updateExpenseDto.tripId,
        payerId: updateExpenseDto.payerId
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.expense.delete({
      where: { id }
    })
  }
}
