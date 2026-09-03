import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(
  OmitType(CreateExpenseDto, ['tripUuid'] as const),
) {}
