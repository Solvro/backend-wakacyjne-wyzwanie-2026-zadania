import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return (this.databaseService as any).participant.create({
      data: {
        name: createParticipantDto.name,
        trips: {
          connect: { id: createParticipantDto.tripId },
        },
      },
    });
  }

  async findAll(skip?: number, take?: number) {
    return (this.databaseService as any).participant.findMany({
      skip,
      take,
    });
  }

  async findOne(id: number) {
    const participant = await (
      this.databaseService as any
    ).participant.findUnique({
      where: { id },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);

    const dataToUpdate: any = {
      name: updateParticipantDto.name,
    };

    if (updateParticipantDto.tripId) {
      dataToUpdate.trips = {
        connect: { id: updateParticipantDto.tripId },
      };
    }

    return (this.databaseService as any).participant.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return (this.databaseService as any).participant.delete({
      where: { id },
    });
  }
}
