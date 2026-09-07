import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.password) {
      if (!dto.oldPassword) {
        throw new BadRequestException('Podaj stare hasło');
      }
      const valid = await bcrypt.compare(dto.oldPassword, user.password);
      if (!valid) {
        throw new UnauthorizedException('Nieprawidłowe stare hasło');
      }
    }

    const data: Record<string, unknown> = { ...dto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password as string, 10);
    }
    delete data.oldPassword;

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });
  }
}
