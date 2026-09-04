import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private databaseService: DatabaseService, private jwtService: JwtService,) { }

    async register(registerDto: RegisterDto): Promise<any> {
        const existingUser = await this.databaseService.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email aready exists',);
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        return this.databaseService.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
            },
        });

    }

    async login(loginDto: LoginDto) {
        const user = await this.databaseService.user.findUnique({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new NotFoundException(
                `User not found with this email`,
            );
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong password');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            timestamp: Date.now(),
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
