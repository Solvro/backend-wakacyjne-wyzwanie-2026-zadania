import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: "Tworzy nowy wydatek",
    description: "Tworzy nowy wydatek, z ceną, id osoby która zapłaciła, datą płatności, oraz opcjonalnym opisem"
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Pobiera wszystkie wydatki"
  })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Pobiera konkretny wydatek",
    description: "Pobiera konkretny wydatek według jego id"
  })
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Modyfikuje konkretny wydatek",
    description: "Modyfikuje konkretny wydatek według jego id"
  })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Usuwa konkretny wydatek"
  })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
