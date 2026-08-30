var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { CreateTripParticipantDto } from './dto/create-trip_participant.dto';
import { UpdateTripParticipantDto } from './dto/update-trip_participant.dto';
let TripParticipantsService = class TripParticipantsService {
    create(createTripParticipantDto) {
        return 'This action adds a new tripParticipant';
    }
    findAll() {
        return `This action returns all tripParticipants`;
    }
    findOne(id) {
        return `This action returns a #${id} tripParticipant`;
    }
    update(id, updateTripParticipantDto) {
        return `This action updates a #${id} tripParticipant`;
    }
    remove(id) {
        return `This action removes a #${id} tripParticipant`;
    }
};
TripParticipantsService = __decorate([
    Injectable()
], TripParticipantsService);
export { TripParticipantsService };
//# sourceMappingURL=trip_participants.service.js.map