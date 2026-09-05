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

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(
        `Unable to find user with ID of ${id.toString()}`,
      );
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email) {
      await this.ensureEmailNotTaken(updateUserDto.email, id);
    }

    return this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
      select: userSelect,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.databaseService.user.delete({
      where: {
        id,
      },
      select: userSelect,
    });
  }
}
