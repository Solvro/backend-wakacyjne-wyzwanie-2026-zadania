import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripController } from './trip/trip.controller';
import { PrismaService } from './trip/prisma/prisma.service';
@Module({
  imports: [],
  controllers: [AppController, TripController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
