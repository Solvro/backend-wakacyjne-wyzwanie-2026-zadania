import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TripController],
  providers: [TripService, PrismaService],
})
export class TripModule {}
