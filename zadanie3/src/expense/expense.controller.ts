import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import { JwtAuthGuard } from '../user/jwt.authguard';

@Controller('expense')
@ApiTags('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a new expense',
    description: 'Add a new expense to the database',
  })
  @ApiResponse({
    status: 201,
    description: 'The expense was successfully added to the database',
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrive a list of all expenses',
    description: 'Retrive a list of all expenses from the database',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of all expenses was successfully retrived from the database',
  })
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrive the expense with chosen ID',
    description: 'Retrive the expense with chosen ID from the database',
  })
  @ApiResponse({
    status: 200,
    description: 'The expense with chosen ID was successfully retrived from the database',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update the expense with chosen ID',
    description: 'Update and save the changed information about the expense with chosen ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The information was successfully changed',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete the expense with chosen ID',
    description: 'Delete the expense with chosen ID from the database',
  })
  @ApiResponse({
    status: 204,
    description: 'The expense was successfully deleted from the database',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}

