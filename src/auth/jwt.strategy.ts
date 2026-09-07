import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'jwt-secret',
    });
  }

  validate(payload: { sub: number; email: string; timestamp?: number }) {
    if (!payload.timestamp) {
      throw new UnauthorizedException('Token wygasł');
    }

    const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS) || 3600000;
    if (Date.now() - payload.timestamp > expiryTimeMs) {
      throw new UnauthorizedException('Token wygasł');
    }
    return { id: payload.sub, email: payload.email };
  }
}
