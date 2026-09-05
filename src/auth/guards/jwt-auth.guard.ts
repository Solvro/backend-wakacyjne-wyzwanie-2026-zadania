import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Brak tokenu autoryzacyjnego');
    }

    const token = authHeader.split(' ')[1];

    let payload: { sub: number; email: string; timestamp: number };
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Nieprawidłowy token');
    }

    const expiryTimeMs = Number(this.configService.get<string>('EXPIRY_TIME_MS'));
    const now = Date.now();

    if (now - payload.timestamp > expiryTimeMs) {
      throw new UnauthorizedException('Token wygasł');
    }

    request.user = { id: payload.sub, email: payload.email };
    return true;
  }
}