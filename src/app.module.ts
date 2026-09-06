import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParticipantsModule } from './participants/participants.module';
import { TripsModule } from './trips/trips.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ParticipantsModule,
    TripsModule,
    ExpensesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
