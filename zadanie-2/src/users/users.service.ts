import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: {email: string, password: string}) {
    return await this.databaseService.user.create({
        data,
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dataToUpdate: any = {}

    if (updateUserDto.email) {
      dataToUpdate.email = updateUserDto.email
    }

    if (updateUserDto.password) {
      dataToUpdate.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    return this.databaseService.user.update({
      where: {
          id,
      },
      data: dataToUpdate
    })
  }

  async findOne(email: string) {
    return await this.databaseService.user.findUnique({
      where: {
          email,
      },
    });
  }

}
