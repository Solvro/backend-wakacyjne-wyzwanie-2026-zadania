import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Expense } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private prismaService: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<CreateExpenseDto> {
    return this.prismaService.expense.create({
      data: {
        title: createExpenseDto.title,
        amount: createExpenseDto.amount,
  	    depositDate: createExpenseDto.depositDate,
  	    tripParticipantId: createExpenseDto.tripParticipantId
      }
    })
  }

  async findAll(): Promise<Expense[]> {
    return this.prismaService.expense.findMany()
  }

  async findOne(id: number): Promise<Expense> {
    const value = await this.prismaService.expense.findUnique({
      where: {
        id
      }
    })

    if (!value){
      throw new NotFoundException("Expense with given id hasn't found.")
    }
    return value;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<UpdateExpenseDto> {
    await this.findOne(id);
    return this.prismaService.expense.update({
      where: {id},
      data: {
        title: updateExpenseDto.title,
        amount: updateExpenseDto.amount,
  	    depositDate: updateExpenseDto.depositDate,
  	    tripParticipantId: updateExpenseDto.tripParticipantId
      }
    });
  }

  async remove(id: number): Promise<Expense> {
    await this.findOne(id);
    return this.prismaService.expense.delete({
      where: {id}
    })
  }
}
