import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({
      data: {
        first_name: createParticipantDto.firstName,
        last_name: createParticipantDto.lastName,
        passport_number: createParticipantDto.passportNumber,
        trips: {
          create: {
              trip_id: createParticipantDto.tripId
          }
        }
      }
    });
  }

  async findAll() {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: {
        id
      }
    })

    if(!participant) {
      throw new NotFoundException("No participant found with the given ID.")
    };
  }

  async update(id: number, UpdateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: {
        id
      },
      data: {
        first_name: UpdateParticipantDto.firstName,
        last_name: UpdateParticipantDto.lastName,
        passport_number: UpdateParticipantDto.passportNumber
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.participant.delete({
      where: {
        id
      }
    })
  }
}
