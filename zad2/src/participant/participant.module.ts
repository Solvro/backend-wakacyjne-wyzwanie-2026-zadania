import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { DatabaseModule } from 'database/database.module';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  imports: [DatabaseModule],
})
export class ParticipantModule {}
