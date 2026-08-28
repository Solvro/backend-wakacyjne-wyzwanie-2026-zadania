import { Module } from '@nestjs/common';
import { TripService } from './trip.service.js';
import { TripController } from './trip.controller.js';

@Module({
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
