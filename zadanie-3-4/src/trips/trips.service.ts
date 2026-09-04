import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Trip } from './entities/trip.entity';
import { Prisma } from '../generated/prisma';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto, currentUserUuid: string) {
    return await this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.create({
        data: { ...createTripDto, createdByUuid: currentUserUuid },
      });
      return Object.assign(new Trip(), trip);
    });
  }

  async findAll() {
    return this.prisma.trip.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(uuid: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { uuid },
      include: {
        participants: {
          select: {
            uuid: true,
            nicknameInTrip: true,
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
        },
      },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with UUID "${uuid}" not found.`);
    }

    return {
      ...trip,
      participants: trip.participants.map((p) => ({
        participantUuid: p.uuid,
        nickname: p.nicknameInTrip,
        userUuid: p.user.uuid,
        name: p.user.name,
        surname: p.user.surname,
        email: p.user.email,
        phone: p.user.phone,
      })),
    };
  }

  async update(
    uuid: string,
    updateTripDto: UpdateTripDto,
    currentUserUuid: string,
  ) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const trip = await tx.trip.findUnique({
          where: { uuid },
        });

        if (!trip) {
          throw new NotFoundException(`Trip with UUID "${uuid}" not found.`);
        }

        if (trip.createdByUuid !== currentUserUuid) {
          throw new ForbiddenException(
            'You do not have permission to update this trip.',
          );
        }

        const updatedTrip = await tx.trip.update({
          where: { uuid },
          data: updateTripDto,
        });

        return Object.assign(new Trip(), updatedTrip);
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Trip with UUID "${uuid}" not found.`);
      }

      throw error;
    }
  }

  async remove(uuid: string, currentUserUuid: string): Promise<Trip> {
    return await this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({
        where: { uuid },
      });

      if (!trip) {
        throw new NotFoundException(`Trip with UUID "${uuid}" not found.`);
      }

      if (trip.createdByUuid !== currentUserUuid) {
        throw new ForbiddenException(
          'You do not have permission to delete this trip.',
        );
      }

      const deletedTrip = await tx.trip.delete({
        where: { uuid },
      });

      return Object.assign(new Trip(), deletedTrip);
    });
  }
}
