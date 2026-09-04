import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService
  ) {}
  
  login(email: string, id: number) {
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
