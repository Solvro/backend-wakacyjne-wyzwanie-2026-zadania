import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.databaseService.participant.create({ data: createParticipantDto });
  }

  findMany() {
    return this.databaseService.participant.findMany();
  }

  findOne(id: number) {
    return this.databaseService.participant.findUnique({ where: { id } });
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.databaseService.participant.update({ where: { id }, data: updateParticipantDto });
  }

  remove(id: number) {
    return this.databaseService.participant.delete({ where: { id } });
  }
}