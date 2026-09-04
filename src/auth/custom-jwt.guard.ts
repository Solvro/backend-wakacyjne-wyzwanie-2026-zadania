import {CanActivate, ExecutionContext,Injectable, UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class CustomJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Pusty token');
    }

    try {

      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const expiryTimeMs = parseInt(process.env.EXPIRY_TIME_MS || '3600000', 10);
      const now = Date.now();
      
      if (now - payload.timestamp > expiryTimeMs) {
        throw new UnauthorizedException('Token wygasł');
      }

      request['user'] = payload;

    } 
    catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Niewłaściwy token');
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}