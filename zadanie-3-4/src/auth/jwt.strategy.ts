import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

export interface JwtPayload {
  sub: string;
  email: string;
  timestamp: Date;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.userService.findOne(payload.sub);

      if (!user.isActive || user.deletedAt !== null) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }
      throw error;
    }
  }
}
