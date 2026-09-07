import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { AuthRegisterDto } from 'src/auth/dto/auth-register.dto';
import { DatabaseService } from 'src/database/database.service';

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
}
