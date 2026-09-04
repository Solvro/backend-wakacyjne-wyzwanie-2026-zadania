import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async update(id: number, dto: UpdateUserDto) {
    if (dto.email) {
      const email = dto.email.toLowerCase();
      const existingUser = await this.databaseService.user.findFirst({
        where: { email, NOT: { id } },
      });
      if (existingUser) {
        throw new ConflictException('Użytkownik z tym adresem email już istnieje');
      }
    }

    try {
      return await this.databaseService.user.update({
        where: { id },
        data: {
          email: dto.email?.toLowerCase(),
          password: dto.password ? await bcrypt.hash(dto.password, 10) : undefined,
        },
        select: { id: true, email: true, createdAt: true, updatedAt: true },
      });
    } catch {
      throw new NotFoundException('Użytkownik nie istnieje');
    }
  }
}