import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate: any = { ...updateUserDto };

    if (updateUserDto.password) {
      userToUpdate.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.databaseService.user.update({
      where: { id: id },
      data: userToUpdate,
      select: {
        id: true,
        email: true,
      },
    });
  }
}