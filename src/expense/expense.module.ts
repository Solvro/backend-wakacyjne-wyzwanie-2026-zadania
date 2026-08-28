import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
