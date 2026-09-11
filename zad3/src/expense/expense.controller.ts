import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Expenses')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  @ApiOperation({ summary: 'Create a new expense for a trip' })
  @ApiResponse({ status: 201, description: 'The expense has been successfully logged.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data (e.g., negative amount).' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all expenses' })
  @ApiResponse({ status: 200, description: 'Returns an array of all expenses across all trips.' })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single expense by its ID' })
  @ApiResponse({ status: 200, description: 'Returns the found expense.' })
  @ApiResponse({ status: 404, description: 'Expense with the given ID was not found.' })
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({whitelist: true}))
  @ApiOperation({ summary: 'Update an existing expense' })
  @ApiResponse({ status: 200, description: 'The expense has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data provided.' })
  @ApiResponse({ status: 404, description: 'Expense with the given ID was not found.' })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense by its ID' })
  @ApiResponse({ status: 200, description: 'The expense has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Expense with the given ID was not found.' })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
