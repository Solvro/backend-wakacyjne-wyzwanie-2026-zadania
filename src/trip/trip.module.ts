import { Module } from '@nestjs/common';
import { TripsService } from './trip.service';
import { TripsController } from './trip.controller';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripModule {}
