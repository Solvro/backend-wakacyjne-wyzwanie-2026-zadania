import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new expense',
    description: 'Add an expense to the database.',
  })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created.',
    type: CreateExpenseDto,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of expenses',
    description: 'Retrieves a list of expenses from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of expenses has been successfully retrieved.',
    type: [CreateExpenseDto],
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve an expense by ID',
    description: 'Retrieves an expense by their unique ID from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully retrieved.',
    type: CreateExpenseDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an expense by ID',
    description: 'Updates an expense by their unique ID from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully updated.',
    type: UpdateExpenseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an expense by ID',
    description: 'Deletes an expense by their unique ID from the database.',
  })
  @ApiResponse({
    status: 204,
    description: 'The expense has been successfully deleted.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(+id);
  }
}
