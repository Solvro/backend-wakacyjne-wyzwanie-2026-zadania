import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';
import { TripModule } from './trip/trip.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
  isGlobal: true,
  }), DatabaseModule, ParticipantModule, ExpenseModule, TripModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
