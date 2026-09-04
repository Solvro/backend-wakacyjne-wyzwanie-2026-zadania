import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(dto: AuthDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    
    if (userExists) {
      throw new ConflictException('Użytkownik z tym adresem email już istnieje')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hashedPassword }
    });

    return { message: 'Rejestracja udana', userId: user.id };
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Błędne dane logowania');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Błędne dane logowania');

    const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}