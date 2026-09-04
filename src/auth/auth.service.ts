import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const existingUser = await this.databaseService.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Użytkownik z tym adresem email już istnieje');
    }

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.databaseService.user.create({
      data: { email, password },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
    return { accessToken: this.jwtService.sign(payload) };
  }
}