import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { timestamp } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        'Istnieje użytkownik zarejestrowany na ten mail',
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // Nie wypuszczamy hasła
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
      select: { id: true, email: true },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Email lub hasło są niepoprawne');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email lub hasło są niepoprawne');
    }
    const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async update(userid: number, updateUserDto: UpdateUserDto) {
    const dataToUpdate: any = {};
    if (updateUserDto.email) {
      dataToUpdate.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      dataToUpdate.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prisma.user.update({
      where: { id: userid },
      data: dataToUpdate,
      select: { id: true, email: true },
    });
  }
}
