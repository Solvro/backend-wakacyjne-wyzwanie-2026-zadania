import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from 'database/database.service';

@Injectable()
export class ParticipantService {

  constructor(private databaseService: DatabaseService){}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({
      data:{
        first_name: createParticipantDto.first_name,
        last_name: createParticipantDto.last_name,
        date_of_birth: createParticipantDto.date_of_birth,
        gender: createParticipantDto.gender
      }
    })
  }

  async findAll() {
    return this.databaseService.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: {id}
    });

    if(!participant){
      throw new NotFoundException(`Participant with id ${id} not found!`);
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    await this.findOne(id);
    return this.databaseService.participant.update({
      where: {id},
      data:{
        first_name: updateParticipantDto.first_name,
        last_name: updateParticipantDto.last_name,
        date_of_birth: updateParticipantDto.date_of_birth,
        gender: updateParticipantDto.gender
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.participant.delete({
      where: {id}
    });
  }
}
