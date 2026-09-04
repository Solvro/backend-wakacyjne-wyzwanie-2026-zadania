import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripController } from './trip/trip.controller';
import { ParticipantModule } from './participant/participant.module';
import { ExpenseModule } from './expense/expense.module';
import { TripModule } from './trip/trip.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParticipantController } from './participant/participant.controller';
import { ExpenseController } from './expense/expense.controller';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TripModule,
    ExpenseModule,
    ParticipantModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
