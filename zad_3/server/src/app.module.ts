import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { ParticipantModule } from "./participant/participant.module";
import { ExpenseModule } from "./expense/expense.module";
import { TripModule } from "./trip/trip.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ParticipantModule,
    ExpenseModule,
    TripModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
