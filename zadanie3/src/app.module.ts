import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ParticipantModule } from './participant/participant.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [PrismaModule, ParticipantModule, TripModule, ExpenseModule],
})
export class AppModule {}