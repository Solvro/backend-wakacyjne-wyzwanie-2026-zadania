import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TripsModule } from './trips/trips.module';
import { ParticipantsModule } from './participants/participants.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [PrismaModule, TripsModule, ParticipantsModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
