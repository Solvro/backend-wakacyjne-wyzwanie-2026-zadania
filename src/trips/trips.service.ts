import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        TripDate: new Date(createTripDto.TripDate),
        Destination: createTripDto.Destination,
        Description: createTripDto.Description,
      },
    });
  }

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        Participants: {
          select: {
            ParticipantID: true,
            TripID: true,
            Name: true,
            Surname: true,
          },
        },
        Expenses: true,
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { TripID: id },
      include: {
        Participants: {
          select: {
            ParticipantID: true,
            TripID: true,
            Name: true,
            Surname: true,
          },
        },
        Expenses: true,
      },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);

    return this.prisma.trip.update({
      where: { TripID: id },
      data: {
        ...(updateTripDto.TripDate && {
          TripDate: new Date(updateTripDto.TripDate),
        }),
        ...(updateTripDto.Destination !== undefined && {
          Destination: updateTripDto.Destination,
        }),
        ...(updateTripDto.Description !== undefined && {
          Description: updateTripDto.Description,
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.trip.delete({
      where: { TripID: id },
    });
  }
}
