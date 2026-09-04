import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const existing = await this.database.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Użytkownik z tym adresem email już istnieje');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.database.user.create({
      data: { email: dto.email, password: hashedPassword },
    });

    return { id: user.id, email: user.email };
  }

  async login(dto: CreateAuthDto) {
    const user = await this.database.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async update(id: number, dto: UpdateAuthDto) {
    const data: { email?: string; password?: string } = {};

    if (dto.email) {
      data.email = dto.email;
    }
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.database.user.update({
      where: { id },
      data,
    });

    return { id: user.id, email: user.email };
  }
}