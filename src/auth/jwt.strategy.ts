import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:
        process.env.JWT_SECRET || 'super-secret-wakacyjne-solvro-key',
    });
  }

  validate(payload: JwtPayload) {
    const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS ?? 3600000);
    if (!payload.timestamp || Date.now() - payload.timestamp > expiryTimeMs) {
      throw new UnauthorizedException('Token wygasł');
    }
    return { id: payload.sub, email: payload.email };
  }
}
