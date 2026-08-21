import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsController } from './trips.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, TripsController], 
  providers: [AppService, PrismaService],        
})
export class AppModule {}