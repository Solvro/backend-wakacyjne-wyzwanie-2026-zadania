import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Dodaj nowy wydatek' })
  @ApiResponse({
    status: 201,
    description: 'Wydatek został pomyślnie utworzony.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich wydatków' })
  @ApiResponse({
    status: 200,
    description: 'Lista wydatków.',
    type: [ExpenseResponseDto],
  })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wydatek po ID' })
  @ApiParam({ name: 'id', description: 'Identyfikator wydatku', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Dane wydatku.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wydatek nie został znaleziony.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wydatek' })
  @ApiParam({ name: 'id', description: 'Identyfikator wydatku', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Zaktualizowane dane wydatku.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wydatek nie został znaleziony.' })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Usuń wydatek' })
  @ApiParam({ name: 'id', description: 'Identyfikator wydatku', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został usunięty.',
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wydatek nie został znaleziony.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
