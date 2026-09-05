import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [DatabaseModule],
})
export class ExpenseModule {}
