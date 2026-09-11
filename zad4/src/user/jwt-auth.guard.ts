import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No JWT Token');
    }

    const token = authHeader.split(' ')[1]; 

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'domyslny_klucz',
      });

      const expiryTime = Number(process.env.EXPIRY_TIME_MS) || 3600000;
      const now = Date.now();

     
      if (now - payload.timestamp > expiryTime) {
        throw new UnauthorizedException('Token expired');
      }

      request.user = payload; 
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error; 
      }
      throw new UnauthorizedException('Wrong Token');
    }
  }
}