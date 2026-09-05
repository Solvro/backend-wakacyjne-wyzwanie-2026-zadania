import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service.js';
import { ExpenseController } from './expense.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
