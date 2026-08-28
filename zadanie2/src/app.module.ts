import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParticipantsModule } from './participants/participants.module';
import { TripsModule } from './trips/trips.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [DatabaseModule, ParticipantsModule, TripsModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
