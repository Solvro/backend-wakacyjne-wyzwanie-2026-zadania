import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Request } from 'express';


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException("Token error");
        }
        
        const payload = await this.authService.verifyToken(token);
        request['user'] = payload;

        return true;
    }
        
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
  }
}