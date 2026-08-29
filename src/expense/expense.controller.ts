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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiCreatedResponse({
    description: 'The expense has been successfully created.',
    type: Expense,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all expenses' })
  @ApiOkResponse({
    description: 'List of all expenses.',
    type: [Expense],
  })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID', type: Number })
  @ApiOkResponse({
    description: 'The expense details.',
    type: Expense,
  })
  @ApiNotFoundResponse({ description: 'Expense not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID', type: Number })
  @ApiOkResponse({
    description: 'The expense has been successfully updated.',
    type: Expense,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({ description: 'Expense not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID', type: Number })
  @ApiOkResponse({
    description: 'The expense has been successfully deleted.',
    type: Expense,
  })
  @ApiNotFoundResponse({ description: 'Expense not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
