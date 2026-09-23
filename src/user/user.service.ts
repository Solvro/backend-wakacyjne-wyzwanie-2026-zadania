import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: { email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({ where: { id }, data: dto });
    const { password, ...result } = user;
    return result;
  }
}
