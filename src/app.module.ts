import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { TripController } from './trip/trip.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, TripController],
  providers: [AppService],
})
export class AppModule {}