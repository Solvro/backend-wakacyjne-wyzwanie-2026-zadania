import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.participant.findMany({
      include: { trip: true, expenses: true },
    });
  }

  create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({
      data: {
        name: createParticipantDto.name,
        tripId: createParticipantDto.tripId,
      },
    });
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { id },
      include: { trip: true, expenses: true },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
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
    return this.databaseService.participant.delete({ where: { id } });
  }
}