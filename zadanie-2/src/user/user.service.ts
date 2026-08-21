import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserDto> {
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

    return Object.assign(new UserDto(), userFromDb);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto,
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

      return Object.assign(new UserDto(), newUser);
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
}
