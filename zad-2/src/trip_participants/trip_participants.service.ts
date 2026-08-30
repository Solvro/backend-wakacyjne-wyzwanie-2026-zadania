import { Injectable } from '@nestjs/common';
import { CreateTripParticipantDto } from './dto/create-trip_participant.dto';
import { UpdateTripParticipantDto } from './dto/update-trip_participant.dto';
import type { DatabaseService } from '../database/database.service';

@Injectable()
export class TripParticipantsService {
  constructor(private databaseService: DatabaseService) {}
  
  create(createTripParticipantDto: CreateTripParticipantDto) {
    return this.databaseService.tripParticipant.create({
      data: {
        tripId: createTripParticipantDto.trip_id,
        personId: createTripParticipantDto.person_id
      }
    });
  }

  findAll() {
    return this.databaseService.tripParticipant.findMany();
  }

  findByTripId(id: number) {
    return this.databaseService.tripParticipant.findMany({
      where: {
        tripId: id
      }
    });
  }

  findByPersonId(id: number) {
    return this.databaseService.tripParticipant.findMany({
      where: {
        personId: id
      }
    });
  }

  remove(tripId: number, personId: number) {
    return this.databaseService.tripParticipant.delete({
      where: { tripId_personId: { tripId, personId } }
    })
  }
}
