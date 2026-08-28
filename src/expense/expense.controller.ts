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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Expense } from './entities/expense.entity';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new expense',
    description:
      'Adds an expense to the database. The trip must exist, and if a buyer (participantId) is given, they must be a participant of that same trip',
  })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created',
    type: Expense,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all expenses',
    description: 'Lists all expenses in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all expenses',
    type: [Expense],
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an expense',
    description: 'Retrieves a single expense by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The expense with the given ID',
    type: Expense,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an expense',
    description:
      'Updates an expense by its ID. If the trip is changed, it must exist. If the trip or buyer (participantId) is changed, the resulting buyer must be a participant of the resulting trip',
  })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully updated',
    type: Expense,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an expense',
    description: 'Removes an expense from the database by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully deleted',
    type: Expense,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
