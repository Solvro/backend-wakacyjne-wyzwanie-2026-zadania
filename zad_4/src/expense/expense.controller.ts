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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "generated/prisma/enums";

@Controller("expense")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.MOD, UserRole.ADMIN)
@ApiTags("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new expense",
    description: "Add an expense to the database.",
  })
  @ApiResponse({
    status: 201,
    description: "The expense has been successfully created.",
    type: CreateExpenseDto,
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({
    summary: "Retrieve a list of expenses",
    description: "Retrieves a list of expenses from the database.",
  })
  @ApiResponse({
    status: 200,
    description: "A list of expenses has been successfully retrieved.",
    type: [CreateExpenseDto],
  })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Retrieve an expense by ID",
    description: "Retrieves an expense by their unique ID from the database.",
  })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully retrieved.",
    type: CreateExpenseDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update an expense by ID",
    description: "Updates an expense by their unique ID from the database.",
  })
  @ApiResponse({
    status: 200,
    description: "The expense has been successfully updated.",
    type: UpdateExpenseDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete an expense by ID",
    description: "Deletes an expense by their unique ID from the database.",
  })
  @ApiResponse({
    status: 204,
    description: "The expense has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
