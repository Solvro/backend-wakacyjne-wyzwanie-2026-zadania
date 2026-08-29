import { Injectable } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        timestamp: new Date(createExpenseDto.timestamp),
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number) {
    return this.prisma.expense.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: {
        ...updateExpenseDto,
        ...(updateExpenseDto.timestamp && {
          timestamp: new Date(updateExpenseDto.timestamp),
        }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
