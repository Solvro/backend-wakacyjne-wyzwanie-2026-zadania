import { Module } from '@nestjs/common';
import { TripParticipantsService } from './trip_participants.service';
import { TripParticipantsController } from './trip_participants.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [TripParticipantsController],
  providers: [TripParticipantsService],
  exports: [TripParticipantsService],
  imports: [DatabaseModule]
})
export class TripParticipantsModule {}
