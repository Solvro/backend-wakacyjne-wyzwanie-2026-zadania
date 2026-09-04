import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from '../auth/jwt.strategy';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
@ApiTags('expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @ApiOperation({ summary: 'List all expenses' })
  @ApiResponse({ status: 200, description: 'Expenses returned successfully.' })
  findAll(@Req() request: Request & { user: AuthenticatedUser }) {
    return this.expensesService.findAll(request.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an expense' })
  @ApiResponse({ status: 201, description: 'Expense created successfully.' })
  create(@Req() request: Request & { user: AuthenticatedUser }, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(request.user.id, createExpenseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense returned successfully.' })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  findOne(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(request.user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense' })
  @ApiResponse({ status: 200, description: 'Expense updated successfully.' })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  update(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(request.user.id, id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense' })
  @ApiResponse({ status: 200, description: 'Expense deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  remove(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(request.user.id, id);
  }
}