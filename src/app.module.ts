import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TripModule } from './trip/trip.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, TripModule, ParticipantModule, ExpenseModule, AuthModule],
})
export class AppModule {}
