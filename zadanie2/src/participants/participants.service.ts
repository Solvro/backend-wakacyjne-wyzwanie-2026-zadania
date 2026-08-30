import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: createParticipantDto,
    });
  }

  async findAll() {
    return this.prisma.participant.findMany({
      include: {
        expenses: true,
      },
    });
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      include: {
        expenses: true,
      },
    });
    if (!participant) {
      throw new NotFoundException(`Uczestnik o ID ${id} nie został znaleziony`);
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.prisma.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.participant.delete({
      where: { id },
    });
  }
}
