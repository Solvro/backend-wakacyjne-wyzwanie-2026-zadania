import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET!,
        });
    }

    async validate(payload: any) {
        const expiryTimeMs = parseInt(process.env.EXPIRY_TIME_MS || '3600000', 10);
        const currentTime = Date.now();

        if (currentTime - payload.timestamp > expiryTimeMs) {
            throw new UnauthorizedException('Token wygasł');
        }

        // To, co tu zwrócimy, NestJS automatycznie przypisze do obiektu req.user
        return { id: payload.sub, email: payload.email };
    }
}
