import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ParticipantModule } from './participant/participant.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, ParticipantModule, TripModule, ExpenseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
