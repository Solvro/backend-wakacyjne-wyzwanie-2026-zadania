import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { ExpenseResponseDto } from './dto/response-expense.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags("expenses")
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
    
  
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({summary:"Create an expense"})
  @ApiResponse({status:201, description:"Expense created succesfully"})
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({summary:"Get all expenses"})
  @ApiResponse({status:200, type:ExpenseResponseDto})
  findAll(@Query('page') page:number, @Query('limit') limit:number) {
    return this.expenseService.findAll(page,limit);
  }

  @Get(':id')
  @ApiOperation({summary:"Get expense by ID"})
  @ApiResponse({status:200, type:ExpenseResponseDto})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(+id);
  }

  @Get("trip/:tripId")
  @ApiOperation({summary:"Get expenses by trip ID"})
  @ApiResponse({status:200, type:ExpenseResponseDto})
  findByTripId(@Param('tripId', ParseIntPipe) tripId:number){
    return this.expenseService.findByTripId(+tripId);
  }


  @Get("participant/:paidById")
  @ApiOperation({summary:"Get expenses by participant who paid ID"})
  @ApiResponse({status:200, type:ExpenseResponseDto})
  findByParticipantId(@Param('paidById', ParseIntPipe) paidById:number){
    return this.expenseService.findByParticipantId(+paidById);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({summary:"Update expense by ID"})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({summary:"Delete expense by ID"})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(+id);
  }
}
