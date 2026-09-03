import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParticipantsModule } from './participants/participants.module';
import { TripsModule } from './trips/trips.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ParticipantsModule,
    TripsModule,
    ExpensesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
