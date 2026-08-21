import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TripsController } from './trips/trips.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, TripsController],
  providers: [AppService],
})
export class AppModule {}
