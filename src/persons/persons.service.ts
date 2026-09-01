import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PersonsService {
  constructor(@Inject(DatabaseService) private databaseService: DatabaseService) {}
  
  create(createPersonDto: CreatePersonDto) {
    return this.databaseService.person.create({
      data: {
        id: createPersonDto.id,
        first_name: createPersonDto.first_name,
        last_name: createPersonDto.last_name,
        dob: createPersonDto.dob,
        gender: createPersonDto.gender
      }
    });
  }

  findAll() {
    return this.databaseService.person.findMany();
  }

  findOne(id: number) {
    return this.databaseService.person.findFirst({
      where: { id }
    });
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return this.databaseService.person.update({
      where: { id },
      data: {
        first_name: updatePersonDto.first_name,
        last_name: updatePersonDto.last_name,
        dob: updatePersonDto.dob,
        gender: updatePersonDto.gender
      }
    });
  }

  remove(id: number) {
    return this.databaseService.person.delete({
      where: { id }
    });
  }
}
