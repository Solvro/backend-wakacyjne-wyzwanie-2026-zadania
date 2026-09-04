import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController as TripsController } from './trips.controller';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
