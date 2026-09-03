import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TripsModule } from './trips/trips.module';
import { ParticipantsModule } from './participants/participants.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, TripsModule, ParticipantsModule, ExpensesModule, ConfigModule.forRoot({isGlobal: true}), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
