import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('expense')
@ApiTags('Expense')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: 'Dodanie nowego wydatku',
    description: 'Dodaje nowy wydatek do bazy danych.',
  })
  @ApiResponse({
    status: 201,
    description: 'Wydatek został dodany pomyślnie.',
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobranie wszystkich wydatków',
    description: 'Zwraca listę wszystkich wydatków z bazy danych.'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista wydatków została pobrana pomyślnie.'
  })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobranie konkretnego wydatku',
    description: 'Zwraca informacje o konkretnym wydatku na podstawie jego ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Informacje o wydatku zostały pobrane pomyślnie.'
  })
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Aktualizacja konkretnego wydatku',
    description: 'Aktualizuje informacje o konkretnym wydatku na podstawie jego ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został zaktualizowany pomyślnie.'
  })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Usunięcie konkretnego wydatku',
    description: 'Usuwa konkretny wydatek na podstawie jego ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został usunięty pomyślnie.'
  })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
