import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: "Insert a new expense",
    description: "Insert a new entry of an expense into the database",
  })
  @ApiResponse({
    status: 201,
    description: "Expense inserted succesfully"
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
      summary: "Get all expenses",
      description: "Retrieve all the expenses from the database",
    })
    @ApiResponse({
      status: 200,
      description: "Expenses received succesfully",
      type: [CreateExpenseDto],
    })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
      summary: "Get expense on given id",
      description: "Retrieve the expense with a given id from the database",
    })
    @ApiResponse({
      status: 200,
      description: "Expense received succesfully",
      type: [CreateExpenseDto],
    })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
      summary: "Change values of a given expense",
      description: "Change the values of an expense with a given id in the database",
    })
    @ApiResponse({
      status: 200,
      description: "Expense updated succesfully",
      type: [UpdateExpenseDto],
    })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({
      summary: "Remove expenst on given id",
      description: "Remove the expense with a given id from the database",
    })
    @ApiResponse({
      status: 200,
      description: "Expense removed succesfully",
    })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
