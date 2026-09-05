import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TripsModule } from './trips/trips.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, TripsModule, ParticipantModule, ExpensesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
