import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExpenseResponseDto } from './dto/create-expense-response.dto';

@Controller('expenses')
@ApiTags("expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) { }

  @Post()
  @ApiOperation({
    summary: "Create new expense",
    description: "Create new expense with title, amount, category,creation date, notes, trip id and payer id"
  })
  @ApiResponse({
    status: 201,
    description: "Expense created successfully",
    type: CreateExpenseResponseDto
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all expenses",
    description: "Retrieve a list of all expenses"
  })
  @ApiResponse({
    status: 200,
    description: "List retrieved successfully",
    type: [CreateExpenseResponseDto]
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get expense by ID",
    description: "Retrive an expense by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Expense retrieved successfully",
    type: CreateExpenseResponseDto
  })
  @ApiResponse({
    status: 404,
    description: " Expense not found"
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update expense by ID",
    description: "Update an expense by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Expense updated successfully",
    type: CreateExpenseResponseDto
  })
  @ApiResponse({
    status: 404,
    description: " Expense not found"
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete expense by ID",
    description: "Delete an expense by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Expense deleted successfully",
    type: CreateExpenseResponseDto
  })
  @ApiResponse({
    status: 404,
    description: " Expense not found"
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
