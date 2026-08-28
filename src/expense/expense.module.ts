import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
