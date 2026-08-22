import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  create(createParticipantDto) {
    return this.prisma.participant.create({
      data: createParticipantDto,
    });
  }

  findAll() {
    return this.prisma.participant.findMany({});
  }

  findOne(id: number) {
    return this.prisma.participant.findUnique({
      where: { id },
    });
  }

  update(id: number, updateParticipantDto) {
    return this.prisma.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  remove(id: number) {
    return this.prisma.participant.delete({
      where: { id },
    });
  }
}
