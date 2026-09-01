import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
  imports: [DatabaseModule]
})
export class TripsModule {}
