import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [DatabaseModule, ParticipantModule, ExpenseModule, TripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
