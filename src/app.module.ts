import { Module } from '@nestjs/common';
import { PersonsController } from './persons/persons.controller';
import { TripsController } from './trips/trips.controller';
import { TripParticipantsController } from './trip_participants/trip_participants.controller';
import { ExpensesController } from './expenses/expenses.controller';
import { PersonsModule } from './persons/persons.module';
import { TripsModule } from './trips/trips.module';
import { TripParticipantsModule } from './trip_participants/trip_participants.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PersonsService } from './persons/persons.service';
import { TripsService } from './trips/trips.service';
import { TripParticipantsService } from './trip_participants/trip_participants.service';
import { ExpensesService } from './expenses/expenses.service';
import { DatabaseService } from './database/database.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module.js';

@Module({
    controllers: [PersonsController, TripsController, TripParticipantsController, ExpensesController, UsersController],
    providers: [PersonsService, TripsService, TripParticipantsService, ExpensesService, UsersService, DatabaseService],
    imports: [AuthModule],
})
export class AppModule {

}
