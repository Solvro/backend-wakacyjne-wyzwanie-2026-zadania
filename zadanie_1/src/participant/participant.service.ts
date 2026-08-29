import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // sprawdź ścieżkę do swojego PrismaService
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({ data: createParticipantDto });
  }

  async findAll() {
    return this.prisma.participant.findMany({});
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { Participant_id: id },
    });
    if (!participant)
      throw new NotFoundException(`Uczestnik o ID ${id} nie istnieje`);
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id); // Sprawdzenie, czy wycieczka istnieje
    return this.prisma.participant.update({
      where: { Participant_id: id },
      data: updateParticipantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Sprawdzenie, czy wycieczka istnieje
    return this.prisma.participant.delete({ where: { Participant_id: id } });
  }
}
