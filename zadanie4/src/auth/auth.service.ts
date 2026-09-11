import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Użytkownik z tym adresem email już istnieje');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });
    const { password, ...result } = user;
    return result;
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }
    const payload = { 
      sub: user.id, 
      email: user.email, 
      timestamp: Date.now() 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async verifyToken(token: string) {
    let payload: { sub: string; email: string; timestamp: number };
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Niepoprawny token');
    }
    const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS) || 3600000;
    const isExpired = Date.now() - payload.timestamp > expiryTimeMs;
    if (isExpired) {
      throw new UnauthorizedException('Token wygasł');
    }
    return payload;
  }
}