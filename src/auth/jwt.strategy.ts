import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '43',
    });
  }

  async validate(payload: { sub: number; email: string; timestamp: number }) {
    const expiryMs = Number(process.env.EXPIRY_TIME_MS) || 3600000;
    const now = Date.now();

    if (!payload.timestamp || now - payload.timestamp > expiryMs) {
      throw new UnauthorizedException('token wygasł');
    }

    return { id: payload.sub, email: payload.email };
  }
}