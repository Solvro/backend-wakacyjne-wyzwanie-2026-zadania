import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('expense')
@ApiTags('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new expense',
    description: 'Create a new expense containing a description, price, category and tripId'
  })
  @ApiResponse({
      status: 201,
      description: "Expense created succesfully."
    })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all expenses',
    description: 'Retrieves a list of all expenses from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'List retrieved succesfully'
  })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one expense',
    description: 'Retrieves a expense with a given unique ID from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'Expense retrieved succesfully'
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found"
  })
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update expense by ID',
    description: "Update a expense's data by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Expense's data updated succesfully"
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found"
  })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete expense by ID',
    description: 'Deletes a expense with a given unique ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Expense deleted succesfully'
  })
  @ApiResponse({
    status: 404,
    description: "Expense not found"
  })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
