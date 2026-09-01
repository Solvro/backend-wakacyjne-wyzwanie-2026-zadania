import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from 'src/database/database.service';
import { Participant } from 'generated/prisma/client';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return this.databaseService.participant.create({
      data: {
        name: createParticipantDto.name,
        email: createParticipantDto.email,
      },
    });
  }

  async findAll(): Promise<Participant[]> {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.databaseService.participant.findUnique({
      where: { id },
    });
    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return participant;
  }

  async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        email: updateParticipantDto.email,
      },
    });
  }

  async remove(id: number): Promise<Participant> {
    await this.findOne(id);
    return this.databaseService.participant.delete({
      where: { id },
    });
  }
}
