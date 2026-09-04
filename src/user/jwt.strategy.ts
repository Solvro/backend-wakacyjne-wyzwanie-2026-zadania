import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }
  async validate(payload: any) {
    const expiryTime = parseInt(process.env.EXPIRY_TIME!, 10);
    const now = Date.now();
    if (now - payload.timestamp > expiryTime) {
      throw new UnauthorizedException('Token wygasł');
    }
    return { id: payload.sub, email: payload.email };
  }
}
