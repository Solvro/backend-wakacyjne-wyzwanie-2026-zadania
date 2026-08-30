import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({
      data: createParticipantDto as Prisma.ParticipantCreateInput,
    });
  }

  findAll() {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { id },
    });
    if (!participant) {
      throw new NotFoundException(`Nie znaleziono uczestnika o ID ${id}`);
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.databaseService.participant.delete({
      where: { id },
    });
  }
}