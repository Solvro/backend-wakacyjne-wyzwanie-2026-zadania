import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number | string) {
    const userId = Number(id);
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        // brak pola password
      },
    });

    if (!user) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
    }
    return user;
  }

  async update(id: number | string, dto: UpdateUserDto) {
    const userId = Number(id);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new ConflictException('Użytkownik z tym adresem email już istnieje');
      }
    }

    // Haszujemy nowe hasło tylko wtedy, gdy zostało przesłane w żądaniu
    let hashedPassword = user.password;
    if (dto.password) {
      hashedPassword = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: dto.email ?? user.email,
        password: hashedPassword,
        name: dto.name ?? user.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return updatedUser;
  }
}