import {PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY as string
        });
    }

    async validate(payload: any){
        
        const date_now = new Date();
        const time_period = date_now.getTime() - payload.timestamp.getTime();

        if(process.env.EXPIRY_TIME_MS && time_period>parseInt(process.env.EXPIRY_TIME_MS)){

            throw new UnauthorizedException("The token expired")
        }

        return { id: payload.sub, email: payload.email, password: payload.password, date_of_birth: payload.date_of_birth};
    }
} 