import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Użytkownik z tym adresem email już istnieje');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
      select: { id: true, email: true },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      timestamp: Date.now() 
    };
    
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async updateProfile(userId: number, dto: UpdateUserDto) {
    const dataToUpdate: any = {};
    
    if (dto.password) {
      dataToUpdate.password = await bcrypt.hash(dto.password, 10);
    }
    
    return this.prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: { id: true, email: true },
    });
  }
}