import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService){}

  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data:{
        amount: createExpenseDto.amount,
        description: createExpenseDto.description,
        expenseDate: new Date(createExpenseDto.expenseDate),
        category: createExpenseDto.category,
        currency: createExpenseDto.currency,

        trip:{
          connect:{
            id: createExpenseDto.tripId,
          },
        },
        paidBy:{
          connect:{
            id: createExpenseDto.paidById,
          },
        },
      },
    });
  }

  findAll(page:number, limit:number) {
    return this.prisma.expense.findMany({
      take:limit,
      skip:(page-1)*limit,
    });
  }

  findOne(id: number) {
    return this.prisma.expense.findUnique({
      where:{
        id,
      },
    });
  }

  findByTripId(tripId:number){
    return this.prisma.expense.findMany({
      where:{
        tripId:tripId,
      },
    });
  }

  findByParticipantId(paidById:number){
    return this.prisma.expense.findMany({
      where:{
        paidById:paidById,
      },
    });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where:{
        id,
      },
      data:{
        amount: updateExpenseDto.amount,
        description: updateExpenseDto.description,
        expenseDate: updateExpenseDto.expenseDate? new Date(updateExpenseDto.expenseDate): undefined,
        category: updateExpenseDto.category,
        currency: updateExpenseDto.currency,

        trip: updateExpenseDto.tripId?{
          connect:{
            id: updateExpenseDto.tripId,
          },
        }: undefined,
        paidBy: updateExpenseDto.paidById?{
          connect:{
            id: updateExpenseDto.paidById,
          },
        }: undefined,

      }
    });
  }

  remove(id: number) {
    return this.prisma.expense.delete({
      where:{
        id
      }
    });
  }
}
