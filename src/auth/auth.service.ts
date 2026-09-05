import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { Email: dto.email },
    });

    if (existing) {
      throw new ConflictException(
        'Użytkownik z tym adresem email już istnieje',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        Email: dto.email,
        Password: hashedPassword,
      },
    });

    return { id: user.User_id, email: user.Email };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { Email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.Password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const payload = {
      sub: user.User_id,
      email: user.Email,
      timestamp: Date.now(),
    };

    return { token: this.jwtService.sign(payload) };
  }
}