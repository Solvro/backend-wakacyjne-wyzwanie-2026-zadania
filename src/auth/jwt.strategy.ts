import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  validate(payload: any) {
    const expiryTime = parseInt(process.env.EXPIRY_TIME_MS || '0', 10);
    const isExpired = Date.now() - payload.timestamp > expiryTime;

    if (isExpired) {
      throw new UnauthorizedException('Token wygasł');
    }
    return { id: payload.sub, email: payload.email };
  }
}
