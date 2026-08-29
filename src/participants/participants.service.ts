import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  create(createParticipantDto: CreateParticipantDto) {
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

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
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
