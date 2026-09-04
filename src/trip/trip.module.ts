import { Module } from '@nestjs/common';
import { TripsService } from './trip.service';
import { TripsController } from './trip.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripModule {}
