import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TripsController } from './trips/trips.controller';

@Module({
  imports: [],
  controllers: [AppController, TripsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
