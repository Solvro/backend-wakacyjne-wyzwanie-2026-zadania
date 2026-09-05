import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateParticipantDto } from './dto/create-participant.dto.js';
import { UpdateParticipantDto } from './dto/update-participant.dto.js';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({ data: createParticipantDto });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.participant.findMany({ skip, take: limit }),
      this.prisma.participant.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { Participant_id: id },
    });

    if (!participant) {
      throw new NotFoundException(`Uczestnik o id ${id} nie istnieje`);
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);

    return this.prisma.participant.update({
      where: { Participant_id: id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.participant.delete({
      where: { Participant_id: id },
    });
  }
}