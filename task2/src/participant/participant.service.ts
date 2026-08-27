import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private prisma: DatabaseService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({ data: createParticipantDto });
  }

  findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { participant_id: id },
    });
    if (!participant)
      throw new NotFoundException(`Uczestnik o id ${id} nie istnieje`);
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.prisma.participant.update({
      where: { participant_id: id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.participant.delete({ where: { participant_id: id } });
  }
}
