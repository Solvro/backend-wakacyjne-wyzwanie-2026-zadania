import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service.js';
import { ExpenseController } from './expense.controller.js';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
