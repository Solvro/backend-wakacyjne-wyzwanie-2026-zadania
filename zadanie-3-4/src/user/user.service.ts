import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Prisma } from '../generated/prisma';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(uuid: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException(`User with uuid ${uuid} was not found.`);
    }

    return Object.assign(new User(), user);
  }

  async findByEmail(email: string): Promise<User> {
    const userFromDb = await this.prisma.user.findUnique({
      where: { email },
      select: {
        uuid: true,
        email: true,
        name: true,
        surname: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        deletedAt: true,
      },
    });

    if (!userFromDb) {
      throw new NotFoundException(`User with email ${email} was not found.`);
    }

    return Object.assign(new User(), userFromDb);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.user.create({
        data: { ...userData, password: hashedPassword },
        omit: { password: true },
      });

      return Object.assign(new User(), newUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `User with email ${createUserDto.email} already exists.`,
        );
      }

      throw error;
    }
  }

  async update(
    currentUserUuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password, ...userData } = updateUserDto;
    const hasNonEmptyPassword =
      password !== undefined && password.trim().length > 0;

    const hashedPassword = hasNonEmptyPassword
      ? await bcrypt.hash(password, 10)
      : undefined;

    try {
      const newUser = await this.prisma.user.update({
        where: { uuid: currentUserUuid },
        data: {
          ...userData,
          ...(hasNonEmptyPassword ? { password: hashedPassword } : {}),
        },
        omit: { password: true },
      });

      return Object.assign(new User(), newUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `User with email ${updateUserDto.email} already exists.`,
          );
        }

        if (error.code === 'P2025') {
          throw new NotFoundException(
            `User with UUID=${currentUserUuid} was not found.`,
          );
        }
      }

      throw error;
    }
  }
}
