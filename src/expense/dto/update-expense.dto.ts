import { PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-expense.dto.js';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
