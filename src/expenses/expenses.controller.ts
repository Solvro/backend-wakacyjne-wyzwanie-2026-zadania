import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseResponseDto } from './dto/expense-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({
    summary: 'Dodaj nowy wydatek',
    description: 'Rejestruje nowy wydatek powiązany z daną wycieczką.',
  })
  @ApiResponse({
    status: 201,
    description: 'Wydatek został pomyślnie utworzony.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Niepoprawne dane wejściowe (błąd walidacji).',
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobierz listę wydatków',
    description: 'Zwraca listę wszystkich wydatków wraz z danymi wycieczki.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista wydatków pobrana pomyślnie.',
    type: [ExpenseResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  async findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobierz wydatek po ID',
    description: 'Zwraca szczegóły pojedynczego wydatku o podanym ExpenseID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator wydatku (ExpenseID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Wydatek znaleziony.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  @ApiResponse({
    status: 404,
    description: 'Wydatek o podanym ID nie został znaleziony.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Zaktualizuj wydatek po ID',
    description: 'Aktualizuje wydatek o podanym ExpenseID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator wydatku (ExpenseID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został pomyślnie zaktualizowany.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Niepoprawne dane aktualizacji (błąd walidacji).',
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  @ApiResponse({
    status: 404,
    description: 'Wydatek o podanym ID nie został znaleziony.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Usuń wydatek po ID',
    description: 'Usuwa wydatek o podanym ExpenseID z bazy danych.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator wydatku (ExpenseID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został pomyślnie usunięty.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  @ApiResponse({
    status: 404,
    description: 'Wydatek o podanym ID nie został znaleziony.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
