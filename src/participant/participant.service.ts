import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from "../database/database.service";
import { Participant } from "@prisma/client";
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.databaseService.participant.create({
      data: {
        trip_id: createParticipantDto.trip_id,
        name: createParticipantDto.name,
        email: createParticipantDto.email,
        role: createParticipantDto.role
      }
    });
  }

  async findAll(): Promise<Participant[]> {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.databaseService.participant.findUnique({
      where: { id }
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: { id },
      data: {
        trip_id: updateParticipantDto.trip_id,
        name: updateParticipantDto.name,
        email: updateParticipantDto.email,
        role: updateParticipantDto.role
      }
    });
  }

  async remove(id: number): Promise<Participant> {
    await this.findOne(id);
    return this.databaseService.participant.delete({
        where: { id }
    })
  }
}
