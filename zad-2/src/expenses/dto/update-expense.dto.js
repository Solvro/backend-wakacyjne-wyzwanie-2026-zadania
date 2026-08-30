import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
}
//# sourceMappingURL=update-expense.dto.js.map