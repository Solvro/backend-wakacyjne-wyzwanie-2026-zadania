import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TripModule } from './trip/trip.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [PrismaModule, TripModule, ParticipantModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

