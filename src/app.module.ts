import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TripModule } from './trip/trip.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [DatabaseModule, TripModule, ParticipantModule, ExpenseModule],
})
export class AppModule {}
