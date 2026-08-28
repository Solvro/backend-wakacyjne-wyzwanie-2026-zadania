import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  private async ensureTripExists(tripId: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new NotFoundException(
        `Unable to find trip with ID of ${tripId.toString()}`,
      );
    }
  }

  private async ensureEmailNotTaken(
    tripId: number,
    email: string,
    excludeParticipantId?: number,
  ) {
    const existing = await this.databaseService.participant.findUnique({
      where: {
        tripId_email: {
          tripId,
          email,
        },
      },
    });

    if (existing && existing.id !== excludeParticipantId) {
      throw new ConflictException(
        `A participant with email ${email} already exists on this trip`,
      );
    }
  }

  async create(createParticipantDto: CreateParticipantDto) {
    await this.ensureTripExists(createParticipantDto.tripId);
    await this.ensureEmailNotTaken(
      createParticipantDto.tripId,
      createParticipantDto.email,
    );

    return this.databaseService.participant.create({
      data: {
        ...createParticipantDto,
      },
    });
  }

  async findAll() {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: {
        id,
      },
    });

    if (!participant) {
      throw new NotFoundException(
        `Unable to find participant with ID of ${id.toString()}`,
      );
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const participant = await this.findOne(id);

    const tripId = updateParticipantDto.tripId ?? participant.tripId;
    const email = updateParticipantDto.email ?? participant.email;

    if (updateParticipantDto.tripId) {
      await this.ensureTripExists(updateParticipantDto.tripId);
    }

    if (updateParticipantDto.tripId ?? updateParticipantDto.email) {
      await this.ensureEmailNotTaken(tripId, email, id);
    }

    return this.databaseService.participant.update({
      where: {
        id,
      },
      data: {
        ...updateParticipantDto,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.participant.delete({
      where: {
        id,
      },
    });
  }
}
