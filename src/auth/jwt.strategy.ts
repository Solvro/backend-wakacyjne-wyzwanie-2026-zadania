import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  validate(payload: { sub: number; email: string; timestamp: number }) {
    const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS);
    if (Date.now() - payload.timestamp > expiryTimeMs) {
      throw new UnauthorizedException('Token wygasł');
    }
    return { id: payload.sub, email: payload.email };
  }
}
