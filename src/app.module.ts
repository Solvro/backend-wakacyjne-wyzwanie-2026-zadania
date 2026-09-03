import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ParticipantModule } from './participant/participant.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [PrismaModule, ParticipantModule, ExpenseModule, TripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}