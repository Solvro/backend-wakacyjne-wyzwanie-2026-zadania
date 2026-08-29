import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseResponseDto } from './dto/expense-response.dto';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wydatków' })
  @ApiQuery({
    name: 'tripId',
    required: false,
    type: Number,
    description: 'Filtruj po ID wycieczki',
  })
  @ApiQuery({
    name: 'paidById',
    required: false,
    type: Number,
    description: 'Filtruj po ID płacącego uczestnika',
  })
  @ApiOkResponse({
    description: 'Lista wydatków',
    type: [ExpenseResponseDto],
  })
  findAll(
    @Query('tripId') tripId?: string,
    @Query('paidById') paidById?: string,
  ) {
    const parsedTripId = tripId ? parseInt(tripId, 10) : undefined;
    const parsedPaidById = paidById ? parseInt(paidById, 10) : undefined;
    return this.expenseService.findAll(parsedTripId, parsedPaidById);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły wydatku po ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID wydatku' })
  @ApiOkResponse({
    description: 'Szczegóły wydatku',
    type: ExpenseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Wydatek o podanym ID nie istnieje' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Dodaj nowy wydatek' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Wydatek został pomyślnie dodany',
    type: ExpenseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Błąd walidacji danych lub uczestnik nie należy do danej wycieczki',
  })
  @ApiNotFoundResponse({
    description: 'Wycieczka lub uczestnik nie istnieje',
  })
  create(@Body() dto: CreateExpenseDto) {
    return this.expenseService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wydatek' })
  @ApiParam({ name: 'id', type: Number, description: 'ID wydatku' })
  @ApiOkResponse({
    description: 'Wydatek został zaktualizowany',
    type: ExpenseResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Wydatek, wycieczka lub uczestnik nie istnieje',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Błąd walidacji danych',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Usuń wydatek' })
  @ApiParam({ name: 'id', type: Number, description: 'ID wydatku' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Wydatek został pomyślnie usunięty',
  })
  @ApiNotFoundResponse({ description: 'Wydatek o podanym ID nie istnieje' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
