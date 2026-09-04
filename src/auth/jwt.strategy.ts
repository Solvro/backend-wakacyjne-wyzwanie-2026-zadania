import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '../prisma.service';

export interface AuthenticatedUser {
  id: number;
  email: string;
}

interface JwtPayload {
  sub: number;
  email: string;
  timestamp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'development-secret-change-me',
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const expiryTime = Number(process.env.EXPIRY_TIME_MS);
    if (!Number.isFinite(expiryTime) || expiryTime <= 0) {
      throw new UnauthorizedException('Nieprawidłowo skonfigurowany czas ważności tokenu');
    }

    if (!payload.timestamp || Date.now() - payload.timestamp > expiryTime) {
      throw new UnauthorizedException('Token wygasł');
    }

    const user = await this.databaseService.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true },
    });

    if (!user) {
      throw new UnauthorizedException('Użytkownik nie istnieje');
    }

    return user;
  }
}