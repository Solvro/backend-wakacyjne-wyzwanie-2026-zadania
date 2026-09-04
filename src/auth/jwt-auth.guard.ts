import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Brak dostępu - wymagany token');
    }
    
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'fallback_secret',
      });
      
      // Sprawdzenie wygaśnięcia tokenu zgodnie z poleceniem
      const expiryTime = parseInt(process.env.EXPIRY_TIME_MS || '3600000', 10);
      if (Date.now() - payload.timestamp > expiryTime) {
        throw new UnauthorizedException('Token wygasł');
      }

      // Przypięcie danych użytkownika do obiektu request
      request.user = { id: payload.sub, email: payload.email };
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw e;
      }
      throw new UnauthorizedException('Nieprawidłowy token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}