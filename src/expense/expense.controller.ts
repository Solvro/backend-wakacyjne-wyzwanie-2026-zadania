import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Wydatki (Expenses)')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaj wydatek' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie wydatki' })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wydatek po ID' })
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wydatek' })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń wydatek' })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}