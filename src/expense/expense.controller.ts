import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('expenses')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created.',
  })
  @ApiOperation({ summary: 'Create a new expense' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all expenses' })
  @ApiOperation({ summary: 'Get all expenses' })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return an expense by ID' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  @ApiOperation({ summary: 'Get an expense by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the expense',
    type: Number,
  })
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  @ApiOperation({ summary: 'Update an expense by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the expense',
    type: Number,
  })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  @ApiOperation({ summary: 'Delete an expense by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the expense',
    type: Number,
  })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
