import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import type { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
