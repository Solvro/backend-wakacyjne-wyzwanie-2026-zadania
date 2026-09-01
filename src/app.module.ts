import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TripsController } from './trips/trips.controller';
import { TripModule } from './trip/trip.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [TripModule, ParticipantModule, ExpenseModule],
  controllers: [AppController, TripsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
