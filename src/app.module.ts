import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
    PrismaModule,
    TripModule,
    ExpenseModule,
    ParticipantModule,
  ],
})
export class AppModule {}