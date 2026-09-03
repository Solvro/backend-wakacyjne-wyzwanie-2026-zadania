import { UnauthorizedException, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async register(registerDto: RegisterDto){
        const {email, password} = registerDto;

        const existingUser = await this.prisma.user.findUnique({where: {email}});

        if(existingUser){
            throw new ConflictException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.prisma.user.create({
            data: {email: email, password: hashedPassword},
        });
        
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword; 
    }

    async login(loginDto: LoginDto){
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({where: { email },});
        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
        };
    }


    async verifyToken(token: string) {
        let payload: { sub: number; email: string; timestamp: number };

        try {
            payload = this.jwtService.verify(token);
        } catch {
            throw new UnauthorizedException('Invalid Token');
        }

        const expiryTimeMs = Number(this.configService.get<string>('EXPIRY_TIME_MS'));
        const now = Date.now();
        const tokenAge = now - payload.timestamp;

        if (tokenAge > expiryTimeMs) {
            throw new UnauthorizedException("Token expired");
        }

        return payload;
    }
}
