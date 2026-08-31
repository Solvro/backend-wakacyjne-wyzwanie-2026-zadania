import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity'; 
import {DatabaseService} from '../database/database.service';

@Injectable()
export class ParticipantService {

  constructor(private databaseService: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.databaseService.participant.create({
      data: {
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        diet: createParticipantDto.diet,
        date_of_birth: createParticipantDto.date_of_birth,
        trips: {
          connect: createParticipantDto.tripsId.map( id => ({ id }))
        }
      }
    });
  }

  async findAll() {
    return this.databaseService.participant.findMany({
      include: {
        trips: {
          include: {
            expenses: true,
          }
        }
      }
    });
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.databaseService.participant.findUnique({
      where : { id },
      include: {
        trips: {
          include: {
            expenses: true,
          }
        }
      }
    })
    
    if( ! participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {

    await this.findOne(id);

    return this.databaseService.participant.update({
      where: { id },
      data: {
        name : updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        diet : updateParticipantDto.diet,
        date_of_birth: updateParticipantDto.date_of_birth,
        trips: {
          connect: updateParticipantDto.tripsId && updateParticipantDto.tripsId.map( id => ({ id }))
        }
      }
    });
  }

  async remove(id: number): Promise<Participant>{

    await this.findOne(id);

    return this.databaseService.participant.delete({
      where: { id }
    });
  }
}

