import { Module } from '@nestjs/common';
import { ParticipantController } from './participant/participant.controller';
import { ParticipantService } from './participant/participant.service';
import { TripService } from './trip/trip.service';
import { TripController } from './trip/trip.controller';
import { ExpenseService } from './expense/expense.service';
import { ExpenseController } from './expense/expense.controller';
import { PrismaModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [ParticipantController,TripController, ExpenseController] ,
  providers: [ParticipantService, TripService, ExpenseService],
})
export class AppModule {}
