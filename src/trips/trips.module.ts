import {Global, Module} from "@nestjs/common";
import {TripsController} from "./trips.controller";
import {TripsService} from "./trips.service";

@Global()
@Module({
    controllers: [TripsController],
    providers: [TripsService],
})
export class TripsModule{}