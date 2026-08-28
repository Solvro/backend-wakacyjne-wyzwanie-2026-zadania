import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto){
    return this.dataBaseService.participant.create({ 
      data: {
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        birthDate: createParticipantDto.birthDate,
        nationality: createParticipantDto.nationality,
        email: createParticipantDto.email
      } 
    });
  }

  async findAll() {
    return this.dataBaseService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.dataBaseService.participant.findUnique({
      where: { id: id },
    });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.dataBaseService.participant.update({
      where: { id: id },
      data: {
        name: updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        birthDate: updateParticipantDto.birthDate,
        nationality: updateParticipantDto.nationality,
        email: updateParticipantDto.email
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.dataBaseService.participant.delete({
      where: { id: id },
    });
  }
}
