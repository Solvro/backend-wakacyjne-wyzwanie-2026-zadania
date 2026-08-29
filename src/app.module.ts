import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantsModule } from './participants/participants.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExpenseModule } from './expense/expense.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [PrismaModule, ParticipantsModule, ExpenseModule, TripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
