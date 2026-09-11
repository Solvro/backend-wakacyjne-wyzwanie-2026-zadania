import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@ApiTags('Wydatki')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Rejestruje nowy wydatek dla wyjazdu' })
  @ApiResponse({ status: 201, description: 'Wydatek został pomyślnie utworzony.' })
  @ApiResponse({ status: 400, description: 'Nieprawidłowe dane wejściowe.' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobiera listę wszystkich wydatków' })
  @ApiResponse({ status: 200, description: 'Lista wydatków została pobrana.' })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobiera szczegóły wydatku o podanym ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator wydatku' })
  @ApiResponse({ status: 200, description: 'Wydatek został znaleziony.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono wydatku o podanym ID.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizuje dane wydatku (np. kwotę lub opis)' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator wydatku' })
  @ApiResponse({ status: 200, description: 'Wydatek został pomyślnie zaktualizowany.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono wydatku.' })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateExpenseDto: UpdateExpenseDto
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuwa wydatek' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator wydatku' })
  @ApiResponse({ status: 200, description: 'Wydatek został pomyślnie usunięty.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono wydatku.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}