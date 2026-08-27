import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TripsController } from '../controller';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [TripsController]
})
export class PrismaModule {}
