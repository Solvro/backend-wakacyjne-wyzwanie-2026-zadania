import { CreateTripParticipantDto } from './dto/create-trip_participant.dto';
import { UpdateTripParticipantDto } from './dto/update-trip_participant.dto';
export declare class TripParticipantsService {
    create(createTripParticipantDto: CreateTripParticipantDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTripParticipantDto: UpdateTripParticipantDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=trip_participants.service.d.ts.map