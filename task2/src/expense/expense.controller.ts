import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaj nowy wydatek' })
  @ApiResponse({
    status: 201,
    description: 'Wydatek został pomyślnie utworzony.',
  })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich wydatków' })
  @ApiResponse({
    status: 200,
    description: 'Zwraca listę wydatków wraz z relacjami.',
  })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wydatek po ID' })
  @ApiParam({ name: 'id', description: 'Identyfikator wydatku', example: 1 })
  @ApiResponse({ status: 200, description: 'Zwraca szczegóły wydatku.' })
  @ApiResponse({
    status: 404,
    description: 'Wydatek o podanym ID nie istnieje.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wydatek' })
  @ApiParam({ name: 'id', description: 'Identyfikator wydatku', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został pomyślnie zaktualizowany.',
  })
  @ApiResponse({
    status: 404,
    description: 'Wydatek o podanym ID nie istnieje.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń wydatek' })
  @ApiParam({ name: 'id', description: 'Identyfikator wydatku', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Wydatek został pomyślnie usunięty.',
  })
  @ApiResponse({
    status: 404,
    description: 'Wydatek o podanym ID nie istnieje.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
