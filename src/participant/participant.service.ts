import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from 'src/database/database.service';
import { Participant } from 'src/generated/prisma/client';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) { }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.databaseService.participant.create({
      data: {
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        email: createParticipantDto.email,
        joinedAt: createParticipantDto.joinedAt,
        tripId: createParticipantDto.tripId,
      }
    });
  }

  async findAll() {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: {
        id
      }
    })
    if (!participant) {
      throw new NotFoundException("No participant with this id found in DB")
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        email: updateParticipantDto.email,
        joinedAt: updateParticipantDto.joinedAt,
        tripId: updateParticipantDto.tripId
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.participant.delete({
      where: { id }
    })
  }
}
