import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Tworzenie nowego wydatku' })
  @ApiCreatedResponse({ description: 'Wydatek został pomyślnie utworzony.' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobieranie wszystkich wydatków' })
  @ApiOkResponse({ description: 'Lista wydatków zwrócona pomyślnie.' })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobieranie wydatku po ID' })
  @ApiOkResponse({ description: 'Wydatek został pomyślnie znaleziony.' })
  @ApiNotFoundResponse({ description: 'Nie znaleziono wydatku.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizacja danych wydatku' })
  @ApiOkResponse({ description: 'Wydatek został zaktualizowany.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuwanie wydatku' })
  @ApiOkResponse({ description: 'Wydatek został usunięty.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}