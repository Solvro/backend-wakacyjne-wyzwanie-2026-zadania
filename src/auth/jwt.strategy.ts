import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret',
    });
  }

  async validate(payload: any) {
    const expiryTimeMs = parseInt(process.env.EXPIRY_TIME_MS || '3600000', 10);
    const now = Date.now();

    if (now - payload.timestamp > expiryTimeMs) {
      throw new UnauthorizedException('Token wygasł');
    }

    return { id: payload.sub, email: payload.email };
  }
}