import { ExpenseStatus } from '../enum/expense-status.enum';

export class Expense {
  uuid!: string;
  title!: string;
  amount!: number;
  currency!: string;
  status!: ExpenseStatus;
  payerUuid!: string;
  tripUuid!: string;
}
