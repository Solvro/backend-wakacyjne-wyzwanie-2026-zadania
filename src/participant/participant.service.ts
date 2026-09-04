import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateParticipantDto) {
    return this.prisma.participant.create({ data: dto });
  }

  findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({ where: { id } });
    if (!participant) throw new NotFoundException(`Participant with ID ${id} not found`);
    return participant;
  }

  async update(id: number, dto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.prisma.participant.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.participant.delete({ where: { id } });
  }
}