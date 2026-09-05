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

  async validate(payload: any) {
    const expiryTime = parseInt(process.env.EXPIRY_TIME_MS as string, 10);
    const timeDiff = Date.now() - payload.timestamp;

    if (timeDiff > expiryTime) {
      throw new UnauthorizedException('Token wygasł');
    }
    return { id: payload.sub, email: payload.email }; 
  }
}