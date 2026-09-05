import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ParticipantModule } from './participant/participant.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';
import { DatabaseService } from './database/database.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}), DatabaseModule, ParticipantModule, TripModule, ExpenseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
