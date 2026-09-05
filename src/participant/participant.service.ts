import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Participant } from '@prisma/client';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.prisma.participant.create({
      data: {
        TripID: createParticipantDto.TripID,
        Name: createParticipantDto.Name,
        Surname: createParticipantDto.Surname,
        ContactNumber: createParticipantDto.ContactNumber,
        PaymentStatus: createParticipantDto.PaymentStatus,
      },
    });
  }

  async findAll(): Promise<Participant[]> {
    return this.prisma.participant.findMany({
      include: {
        Trip: true,
      },
    });
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.prisma.participant.findUnique({
      where: { ParticipantID: id },
      include: {
        Trip: true,
      },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }

    return participant;
  }

  async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    await this.findOne(id);

    return this.prisma.participant.update({
      where: { ParticipantID: id },
      data: {
        ...(updateParticipantDto.TripID !== undefined && {
          TripID: updateParticipantDto.TripID,
        }),
        ...(updateParticipantDto.Name !== undefined && {
          Name: updateParticipantDto.Name,
        }),
        ...(updateParticipantDto.Surname !== undefined && {
          Surname: updateParticipantDto.Surname,
        }),
        ...(updateParticipantDto.ContactNumber !== undefined && {
          ContactNumber: updateParticipantDto.ContactNumber,
        }),
        ...(updateParticipantDto.PaymentStatus !== undefined && {
          PaymentStatus: updateParticipantDto.PaymentStatus,
        }),
      },
    });
  }

  async remove(id: number): Promise<Participant> {
    await this.findOne(id);

    return this.prisma.participant.delete({
      where: { ParticipantID: id },
    });
  }
}
