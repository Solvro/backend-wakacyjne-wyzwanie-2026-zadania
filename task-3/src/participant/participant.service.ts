import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Participant } from '@prisma/client';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return this.prisma.participant.create({
      data: {
        firstName: createParticipantDto.firstName,
        lastName: createParticipantDto.lastName,
        email: createParticipantDto.email,
        adult: createParticipantDto.isAdult,
      },
    });
  }

  async findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
    });
    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} does not exist`);
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.prisma.participant.update({
      data: {
        firstName: updateParticipantDto.firstName,
        lastName: updateParticipantDto.lastName,
        email: updateParticipantDto.email,
        adult: updateParticipantDto.isAdult,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.participant.delete({ where: { id } });
  }
}
