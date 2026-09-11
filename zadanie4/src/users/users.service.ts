import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async update(userId: number, dto: UpdateUserDto) {
    if (dto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Adres email jest już zajęty');
      }
    }
    const dataToUpdate: { email?: string; password?: string } = {};
    if (dto.email) {
      dataToUpdate.email = dto.email;
    }
    if (dto.password) {
      dataToUpdate.password = await bcrypt.hash(dto.password, 10);
    }
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });
    return new UserResponseDto(updatedUser);
  }
}