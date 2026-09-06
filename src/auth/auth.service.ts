import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    const { email, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Użytkownik z tym adresem email już istnieje');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async verifyToken(token: string): Promise<{ sub: number; email: string; timestamp: number }> {
    let payload: { sub: number; email: string; timestamp: number };

    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Nieprawidłowy token autoryzacyjny');
    }

    const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS || '3600000');
    const now = Date.now();
    const tokenAge = now - payload.timestamp;

    if (tokenAge > expiryTimeMs) {
      throw new UnauthorizedException('Token wygasł');
    }

    return payload;
  }
}
