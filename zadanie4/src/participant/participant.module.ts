import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
