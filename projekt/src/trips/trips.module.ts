import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
