import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(dto: LoginDto): Promise<any> {
        const user = await this.usersService.findOne(dto.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
        const token = this.jwtService.sign(payload);

        return { access_token: token };
    }

    async signUp(dto: RegisterDto): Promise<any> {
        const user = await this.usersService.findOne(dto.email);

        if (user) {
            throw new ConflictException('User with this email already exists.');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newUser = await this.usersService.create({email: dto.email, password: hashedPassword});

        const {password, ...result} = newUser;
        return result;
    }
}
