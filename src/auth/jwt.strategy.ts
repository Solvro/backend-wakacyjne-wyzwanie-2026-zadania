import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/database/database.service';


interface JwtPayload {
    sub: number;
    email: string;
    timestamp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private databaseService: DatabaseService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET!,
        });
    }

    async validate(payload: JwtPayload) {
        const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS);
        const age = Date.now() - payload.timestamp;

        if (age > expiryTimeMs) {
            throw new UnauthorizedException('Token has expired');
        }

        const user = await this.databaseService.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return { id: payload.sub, email: payload.email };
    }
}