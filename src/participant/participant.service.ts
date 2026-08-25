import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({
      data: {
        name: createParticipantDto.name,
        tripId: createParticipantDto.tripId,
      },
    });
  }

  async findAll(skip?: number, take?: number) {
    return this.databaseService.participant.findMany({
      skip,
      take,
    });
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { id },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        tripId: updateParticipantDto.tripId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.participant.delete({
      where: { id },
    });
  }
}
