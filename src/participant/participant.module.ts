import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service.js';
import { ParticipantController } from './participant.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
