import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: number, dto: UpdateUserDto) {
    const data: { Email?: string; Password?: string } = {};

    if (dto.email) {
      data.Email = dto.email;
    }

    if (dto.password) {
      data.Password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { User_id: id },
      data,
    });

    return { id: user.User_id, email: user.Email };
  }
}