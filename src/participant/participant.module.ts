import { Module } from '@nestjs/common';
import { ParticipantsService } from './participant.service';
import { ParticipantsController } from './participant.controller';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantModule {}
