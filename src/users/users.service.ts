import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(email: string, password: string): Promise<{}> {
    const user = this.databaseService.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    return {
      id: (await user).id,
      email: (await user).email,
    };
  }

  async findOne(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const dataToUpdate: Partial<UpdateUserDto> = { ...updateUserDto };

    if (dataToUpdate.password) {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    const updatedUser = await this.databaseService.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    const { password, ...result } = updatedUser;
    return result;
  }
}
