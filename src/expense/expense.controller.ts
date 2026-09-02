import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Expenses')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: 'Utwórz nowy wydatek',
    description: 'Dodaje nowy wydatek do bazy danych.',
  })
  @ApiResponse({
    status: 201,
    description: 'Wydatek został pomyślnie utworzony.',
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wydatków' })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Liczba pomijanych rekordów (od którego zacząć)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Maksymalna liczba zwracanych rekordów',
  })
  @ApiResponse({
    status: 200,
    description: 'Zwraca listę wszystkich zarejestrowanych wydatków.',
  })
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.expenseService.findAll(offset, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wydatek po ID' })
  @ApiResponse({
    status: 200,
    description: 'Zwraca szczegóły konkretnego wydatku.',
  })
  @ApiResponse({ status: 404, description: 'Wydatek nie został znaleziony.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wydatek' })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został pomyślnie zaktualizowany.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń wydatek' })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został pomyślnie usunięty.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
