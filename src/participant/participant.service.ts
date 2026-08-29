import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}
  create(CreateParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({ data: CreateParticipantDto });
  }

  findAll() {
    return this.prisma.participant.findMany({
      include: { trip: true, expenses: true },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.participant.findUnique({
      where: { participant_id: id },
    });
    if (!trip) {
      throw new NotFoundException();
    }
    return trip;
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.participant.update({
      where: { participant_id: id },
      data: updateParticipantDto,
    });
  }

  remove(id: number) {
    return this.prisma.participant.delete({ where: { participant_id: id } });
  }
}
