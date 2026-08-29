import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParticipantController } from './participant/participant.controller';
import { ConfigModule } from '@nestjs/config';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ParticipantModule],
  controllers: [AppController, ParticipantController],
  providers: [AppService],
})
export class AppModule {}
