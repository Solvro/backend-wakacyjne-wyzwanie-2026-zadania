import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripController } from './trip/trip.controller';

@Module({
  imports: [],
  controllers: [AppController, TripController],
  providers: [AppService],
})
export class AppModule {}
