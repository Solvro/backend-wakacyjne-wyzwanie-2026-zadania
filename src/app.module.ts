import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripModule } from './trip/trip.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TripModule, ParticipantModule, ExpenseModule, DatabaseModule], // <-- Tutaj dodajesz swoje moduły!
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}