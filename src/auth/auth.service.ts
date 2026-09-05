import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticatedUser } from './interfaces/authenticated-request.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.findOneForAuth(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    return { id: user.id, email: user.email };
  }

  login(user: AuthenticatedUser) {
    const payload = {
      sub: user.id,
      email: user.email,
      timestamp: Date.now(),
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
