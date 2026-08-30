import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService],
  imports: [DatabaseModule]
})
export class ExpensesModule {}
