import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async update(id: number, dto: UpdateUserDto) {
    let dataToUpdate: any = {};

    if (dto.password) {
      dataToUpdate.password = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: dataToUpdate,
    });

    const { password, ...result } = updatedUser;
    return result;
  }
}
