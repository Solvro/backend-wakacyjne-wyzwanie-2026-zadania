import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import type { DatabaseService } from '../database/database.service';

import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    const pwhash = bcrypt.hashSync(createUserDto.password, 10);
    return this.databaseService.user.create({
      data: {
        email: createUserDto.email,
        pwhash
      }
    })
  }

  findAll() {
    return this.databaseService.user.findMany({
      omit: {
        pwhash: true
      }
    });
  }

  findOneById(id: number) {
    return this.databaseService.user.findFirst({
      where: { id },
      omit: {
        pwhash: true
      }
    });
  }

  findOneByEmailWithPwHash(email: string) {
    return this.databaseService.user.findFirst({
      where: { email }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
