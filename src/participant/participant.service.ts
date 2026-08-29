import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({ data: createParticipantDto });
  }

  findAll(skip?: number, take?: number) {
    return this.prisma.participant.findMany({
      skip,
      take,
      include: { trip: true },
    });
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      include: { trip: true, expensesPaid: true },
    });
    if (!participant) throw new NotFoundException(`Participant o id ${id} nie istnieje`);
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.prisma.participant.update({ where: { id }, data: updateParticipantDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.participant.delete({ where: { id } });
  }
}
