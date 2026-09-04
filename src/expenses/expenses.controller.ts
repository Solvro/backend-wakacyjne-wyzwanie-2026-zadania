import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(@Inject(ExpensesService) private expensesService: ExpensesService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LocalAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(+id);
  }
}
