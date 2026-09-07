import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(authLoginDto: AuthLoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(authLoginDto.email);

    const isPasswordValid = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password not valid');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
