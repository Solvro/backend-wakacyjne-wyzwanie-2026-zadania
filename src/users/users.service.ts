import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

const userSelect = {
  id: true,
  createdAt: true,
  email: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  private async ensureEmailNotTaken(email: string, excludeUserId?: number) {
    const existing = await this.databaseService.user.findFirst({
      where: { email },
    });

    if (existing && existing.id !== excludeUserId) {
      throw new ConflictException(
        `A user with email "${email}" already exists`,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    await this.ensureEmailNotTaken(createUserDto.email);

    return this.databaseService.user.create({
      data: {
        ...createUserDto,
      },
      select: userSelect,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({ select: userSelect });
  }

  async findOne(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(`Unable to find user with email "${email}"`);
    }

    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(email);

    if (updateUserDto.email && updateUserDto.email !== email) {
      await this.ensureEmailNotTaken(updateUserDto.email, user.id);
    }

    return this.databaseService.user.update({
      where: {
        email,
      },
      data: {
        ...updateUserDto,
      },
      select: userSelect,
    });
  }

  async remove(email: string) {
    await this.findOne(email);

    return this.databaseService.user.delete({
      where: {
        email,
      },
      select: userSelect,
    });
  }
}
