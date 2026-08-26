import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: DatabaseService){}

  async create(createParticipantDto: CreateParticipantDto) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: createParticipantDto.tripId },
    });

    if (!trip) {
      throw new NotFoundException(
        `Trip with ID ${createParticipantDto.tripId} not exist.`,
      );
    }

    return this.prisma.participant.create({
      data: createParticipantDto,
    });
  }

  findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not exist.`);
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
