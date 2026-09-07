import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto) {
    const user = await this.usersService.findOne(authRegisterDto.email);
    if (user) {
      throw new ConflictException('An account with this email already exists');
    }

    const plainPassword = authRegisterDto.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    try {
      return await this.usersService.create(
        authRegisterDto.email,
        hashedPassword,
      );
    } catch (err) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async signIn(authLoginDto: AuthLoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(authLoginDto.email);
    if (!user) {
      throw new NotFoundException(
        `User with email ${authLoginDto.email} not found`,
      );
    }
    const isPasswordValid = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password not valid');
    }
    const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async update(id: number, authLoginDto: AuthLoginDto) {
    return this.usersService.update(id, authLoginDto);
  }
}
