import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({
      data:{
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        email: createParticipantDto.email,
        pesel: createParticipantDto.pesel,
        phone_number: createParticipantDto.phone_number,
        trip_id: createParticipantDto.trip_id
      }
    })
  }

  async findAll() {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: id }
    })
    if (!participant) {
      throw new NotFoundException("No participant with this id")
    }
    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: { participant_id: id },
      data: {
        name: updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        email: updateParticipantDto.email,
        pesel: updateParticipantDto.pesel,
        phone_number: updateParticipantDto.phone_number,
        trip_id: updateParticipantDto.trip_id
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.databaseService.participant.delete({
      where: { participant_id: id }
    })
  }
}
