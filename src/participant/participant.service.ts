import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantService {
  constructor(private prismaService: PrismaService) {};

  async create(createParticipantDto: CreateParticipantDto) {
    return this.prismaService.participant.create({
      data: {
        nameParticipant: createParticipantDto.nameParticipant,
        surnameParticipant: createParticipantDto.surnameParticipant,
        phone: createParticipantDto.phone,
        email: createParticipantDto.email
      }
    });
  }

  async findAll() {
    return this.prismaService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = this.prismaService.participant.findUnique({
      where: {id}
    });

    if (!participant){
      return new NotFoundException("Participant with given id hasn't found.");
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);

    return this.prismaService.participant.update({
      where: {id},
      data: {
        nameParticipant: updateParticipantDto.nameParticipant,
        surnameParticipant: updateParticipantDto.surnameParticipant,
        phone: updateParticipantDto.phone,
        email: updateParticipantDto.email
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaService.participant.delete({
      where: {id}
    });
  }
}
