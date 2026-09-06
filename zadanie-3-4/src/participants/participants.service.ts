import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createParticipantDto: CreateParticipantDto,
    currentUserUuid: string,
  ) {
    const { tripUuid, userUuid } = createParticipantDto;

    return await this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({
        where: { uuid: tripUuid },
        include: {
          participants: true,
        },
      });

      if (!trip) {
        throw new NotFoundException(`Trip with UUID "${tripUuid}" not found.`);
      }

      if (trip.createdByUuid !== currentUserUuid) {
        throw new ForbiddenException(
          'Only the trip owner can add participants to this trip.',
        );
      }

      const userExists = await tx.user.findUnique({
        where: { uuid: userUuid },
      });

      if (!userExists) {
        throw new NotFoundException(`User with UUID "${userUuid}" not found.`);
      }

      const isAlreadyParticipant = trip.participants.some(
        (participant) => participant.userUuid === userUuid,
      );

      if (isAlreadyParticipant) {
        throw new ConflictException(
          'This user is already a participant of this trip.',
        );
      }

      return await tx.participant.create({
        data: createParticipantDto,
      });
    });
  }

  async findAll() {
    return await this.prisma.participant.findMany({
      select: {
        uuid: true,
        nicknameInTrip: true,
        trip: true,
        user: {
          select: {
            uuid: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async findOne(uuid: string) {
    const participant = await this.prisma.participant.findUnique({
      where: { uuid },
      select: {
        uuid: true,
        nicknameInTrip: true,
        trip: true,
        user: {
          select: {
            uuid: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with UUID "${uuid}" not found.`);
    }

    return participant;
  }

  async update(
    uuid: string,
    updateParticipantDto: UpdateParticipantDto,
    currentUserUuid: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const participant = await tx.participant.findUnique({
        where: { uuid },
        include: {
          trip: true,
        },
      });

      if (!participant) {
        throw new NotFoundException(
          `Participant with UUID "${uuid}" not found.`,
        );
      }

      const isTripOwner = participant.trip.createdByUuid === currentUserUuid;
      const isSelf = participant.userUuid === currentUserUuid;

      if (!isTripOwner && !isSelf) {
        throw new ForbiddenException(
          'You do not have permission to update this participant.',
        );
      }

      return await tx.participant.update({
        where: { uuid },
        data: updateParticipantDto,
      });
    });
  }

  async remove(uuid: string, currentUserUuid: string) {
    return this.prisma.$transaction(async (tx) => {
      const participant = await tx.participant.findUnique({
        where: { uuid },
        include: {
          trip: true,
        },
      });

      if (!participant) {
        throw new NotFoundException(
          `Participant with UUID "${uuid}" not found.`,
        );
      }

      const isTripOwner = participant.trip.createdByUuid === currentUserUuid;
      const isSelf = participant.userUuid === currentUserUuid;

      if (!isTripOwner && !isSelf) {
        throw new ForbiddenException(
          'You do not have permission to remove this participant.',
        );
      }

      await tx.participant.delete({
        where: { uuid },
      });
    });
  }
}
