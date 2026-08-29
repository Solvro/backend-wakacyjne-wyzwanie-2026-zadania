import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TripsController } from './trips/trips.controller';
import {TripsService} from "./trips/trips.service";
import {TripsModule} from "./trips/trips.module";

@Module({
  imports: [DatabaseModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
