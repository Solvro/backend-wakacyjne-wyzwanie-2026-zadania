import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
