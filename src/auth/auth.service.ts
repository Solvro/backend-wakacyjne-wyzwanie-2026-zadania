import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (user) {
      throw new ConflictException('Taki adres istnieje już w bazie'); //
    }

    const passwdhash = await bcrypt.hash(dto.password, 10); //

    const new_user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: passwdhash,
      },
    });

    return {message:'User successfully created'};
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Taki Email nie istnieje w bazie');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Nieprawidłowe dane logowania');

    const payload = { 
      sub: user.user_id, 
      email: user.email, 
      timestamp: Date.now()
    };
    
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
