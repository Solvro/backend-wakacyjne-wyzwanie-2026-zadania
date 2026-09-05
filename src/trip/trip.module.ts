import { Module } from '@nestjs/common';
import { TripService } from './trip.service.js';
import { TripController } from './trip.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
