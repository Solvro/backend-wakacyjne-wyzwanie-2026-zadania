import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TripModule } from 'src/trip/trip.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService],
  imports: [TripModule],
})
export class ExpenseModule {}
