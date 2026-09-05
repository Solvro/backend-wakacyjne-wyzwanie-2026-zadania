import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const now = Date.now();
    const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS);

    if (now - payload.timestamp > expiryTimeMs) {
      throw new UnauthorizedException('Token expired');
    }

    return { userId: payload.sub, email: payload.email };
  }
}