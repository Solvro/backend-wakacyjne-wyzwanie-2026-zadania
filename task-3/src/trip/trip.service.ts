import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        title: createTripDto.title,
        description: createTripDto?.description,
        maxSlots: createTripDto.maxSlots,
        startDate: createTripDto.startDate,
        endDate: createTripDto.endDate,
      },
    });
  }

  async findAll() {
    return this.prisma.trip.findMany();
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        expenses: true,
        participants: true,
      },
    });
    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} does not exist`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.prisma.trip.update({
      data: {
        title: updateTripDto.title,
        description: updateTripDto.description,
        maxSlots: updateTripDto.maxSlots,
        startDate: updateTripDto.startDate,
        endDate: updateTripDto.endDate,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.trip.delete({ where: { id } });
  }

  async addParticipant(tripId: number, participantId: number) {
    // check if trip and participant exists
    const trip = await this.findOne(tripId);
    const participant = await this.prisma.participant.findUnique({
      where: { id: participantId },
    });
    if (!participant) {
      throw new NotFoundException(
        `Participant with id ${participantId} does not exist`,
      );
    }

    // check if participant isn't already on that trip
    for (const tripParticipant of trip.participants) {
      if (tripParticipant.participantId === participantId) {
        throw new ConflictException(
          `Participant with id ${participantId} is already assigned to this trip`,
        );
      }
    }

    // check if there is room for this participant
    if (trip.participants.length >= trip.maxSlots) {
      throw new BadRequestException('Trip is already fully booked');
    }

    // finds free slot
    const takenSlots = trip.participants.map((p) => p.slotNumber);
    let potentialSlot = 1;
    while (takenSlots.includes(potentialSlot)) potentialSlot++;

    return this.prisma.tripParticipant.create({
      data: {
        tripId,
        participantId,
        slotNumber: potentialSlot,
      },
    });
  }

  async removeParticipant(tripId: number, participantId: number) {
    // check if trip and participant exists
    const trip = await this.findOne(tripId);
    const participant = await this.prisma.participant.findUnique({
      where: { id: participantId },
    });
    if (!participant) {
      throw new NotFoundException(
        `Participant with id ${participantId} does not exist`,
      );
    }

    // check if participant isn't already on that trip
    const isParticipantOnTrip = trip.participants.some(
      (p) => p.participantId === participantId,
    );
    if (!isParticipantOnTrip) return;

    return await this.prisma.tripParticipant.delete({
      where: {
        tripId_participantId: {
          tripId,
          participantId,
        },
      },
    });
  }
}
