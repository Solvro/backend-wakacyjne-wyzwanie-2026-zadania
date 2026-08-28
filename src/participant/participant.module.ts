import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service.js';
import { ParticipantController } from './participant.controller.js';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
