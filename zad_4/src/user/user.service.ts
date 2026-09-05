import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma, UserRole } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput): Promise<UserEntity | undefined> {
    try {
      return await this.prisma.user.create({
        data,
        omit: { hashed_password: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("Email is already used");
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      name: updateUserDto.name,
      email: updateUserDto.email,
      tokenVersion: { increment: 1 },
    };
    if (updateUserDto.password !== undefined) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      data.hashed_password = hashedPassword;
    }

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async changeUserRole(userId: number, newRole: UserRole) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        role: newRole,
        tokenVersion: { increment: 1 },
      },
    });
  }
}
