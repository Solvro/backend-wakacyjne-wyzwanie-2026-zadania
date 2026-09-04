import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(userId: number) {
    return this.databaseService.participant.findMany({
      where: { trip: { userId } },
      include: { trip: true, expenses: true },
    });
  }

  async create(userId: number, createParticipantDto: CreateParticipantDto) {
    await this.findTrip(userId, createParticipantDto.tripId);
    return this.databaseService.participant.create({
      data: {
        name: createParticipantDto.name,
        tripId: createParticipantDto.tripId,
      },
    });
  }

  async findOne(userId: number, id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { id, trip: { userId } },
      include: { trip: true, expenses: true },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }

  async update(userId: number, id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(userId, id);
    if (updateParticipantDto.tripId) {
      await this.findTrip(userId, updateParticipantDto.tripId);
    }

    return this.databaseService.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        tripId: updateParticipantDto.tripId,
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.databaseService.participant.delete({ where: { id } });
  }

  private async findTrip(userId: number, tripId: number) {
    const trip = await this.databaseService.trip.findFirst({ where: { id: tripId, userId } });
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${tripId} not found`);
    }
    return trip;
  }
}