import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ParticipantModule } from './participant/participant.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ParticipantModule, TripModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
