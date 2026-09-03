import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense for a trip' })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden (user is not a participant of the trip or not trip owner)',
  })
  @ApiResponse({ status: 404, description: 'Trip or payer not found' })
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.expensesService.create(createExpenseDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({ status: 200, description: 'Return all expenses' })
  async findAll() {
    return await this.expensesService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get an expense by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the expense',
  })
  @ApiResponse({ status: 200, description: 'Return the expense' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.expensesService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update an expense by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the expense to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only the creator or trip owner can update)',
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.expensesService.update(
      uuid,
      updateExpenseDto,
      currentUser,
    );
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete an expense by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the expense to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'The expense has been successfully deleted',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    await this.expensesService.remove(uuid, currentUser);
  }
}
