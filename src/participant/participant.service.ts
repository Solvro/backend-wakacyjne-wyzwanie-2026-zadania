import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  findAll(tripId?: number) {
    return this.prisma.participant.findMany({
      where: tripId ? { tripId } : undefined,
      include: {
        trip: true,
        expenses: true,
      },
    });
  }

  async findOne(id: number) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      include: {
        trip: true,
        expenses: true,
      },
    });

    if (!participant) {
      throw new NotFoundException(`Uczestnik o ID ${id} nie istnieje`);
    }

    return participant;
  }

  async create(dto: CreateParticipantDto) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: dto.tripId },
    });

    if (!trip) {
      throw new NotFoundException(`Wycieczka o ID ${dto.tripId} nie istnieje`);
    }

    return this.prisma.participant.create({
      data: {
        name: dto.name,
        email: dto.email,
        tripId: dto.tripId,
      },
    });
  }

  async update(id: number, dto: UpdateParticipantDto) {
    await this.findOne(id);

    if (dto.tripId) {
      const trip = await this.prisma.trip.findUnique({
        where: { id: dto.tripId },
      });
      if (!trip) {
        throw new NotFoundException(`Wycieczka o ID ${dto.tripId} nie istnieje`);
      }
    }

    return this.prisma.participant.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.email !== undefined && { email: dto.email }),
        ...(dto.tripId && { tripId: dto.tripId }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.participant.delete({
      where: { id },
    });
  }
}
