import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UsersService) private usersService: UsersService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmailWithPwHash(email);
    if (!user || !bcrypt.compareSync(password, user.pwhash)) {
      throw new UnauthorizedException();
    }
    return user;
  }
}