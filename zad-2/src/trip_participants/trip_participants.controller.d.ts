import { TripParticipantsService } from './trip_participants.service';
import { CreateTripParticipantDto } from './dto/create-trip_participant.dto';
import { UpdateTripParticipantDto } from './dto/update-trip_participant.dto';
export declare class TripParticipantsController {
    private readonly tripParticipantsService;
    constructor(tripParticipantsService: TripParticipantsService);
    create(createTripParticipantDto: CreateTripParticipantDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTripParticipantDto: UpdateTripParticipantDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=trip_participants.controller.d.ts.map