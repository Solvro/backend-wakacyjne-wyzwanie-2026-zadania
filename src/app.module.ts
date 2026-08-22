import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TripController } from './trip/trip.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, TripController],
  providers: [AppService],
})
export class AppModule {}
