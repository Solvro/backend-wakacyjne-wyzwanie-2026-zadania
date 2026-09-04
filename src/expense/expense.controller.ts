import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomJwtGuard } from '../auth/custom-jwt.guard';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(CustomJwtGuard)
  @Post()
  @ApiOperation({summary: "Add a new expense"})
  @ApiResponse({status: 201, description: "The expense has been successfully created."})
  @ApiResponse({status: 400, description: "Bad request."})
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({summary: "Get all expenses"})
  @ApiResponse({status: 200, description: "Return all expenses."})
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Get an expense with given ID"})
  @ApiResponse({status: 200, description: "Return the expense."})
  @ApiResponse({status: 404, description: "Expense not found."})
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @UseGuards(CustomJwtGuard)
  @Patch(':id')
  @ApiOperation({summary: "Update an expense with given ID"})
  @ApiResponse({status: 200, description: "The expense has been successfully updated."})
  @ApiResponse({status: 400, description: "Bad request."})
  @ApiResponse({status: 404, description: "Expense not found."})
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @UseGuards(CustomJwtGuard)
  @Delete(':id')
  @ApiOperation({summary: "Delete an expense with given ID"})
  @ApiResponse({status: 200, description: "The expense has been successfully deleted."})
  @ApiResponse({status: 404, description: "Expense not found."})
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
