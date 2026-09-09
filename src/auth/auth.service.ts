import { ConflictException, Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.databaseService.user.findUnique({
            where: {email: registerDto.email},
        });

        if (existingUser) {
            throw new ConflictException('Użytkownik z tym adresem email już istnieje');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const newUser = await this.databaseService.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
            },
        });

        return {
            id: newUser.id,
            email: newUser.email,
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.databaseService.user.findUnique({
            where: {email: loginDto.email},
        });

        if (!user) {
            throw new ConflictException('Niepoprawny email lub hasło');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new ConflictException('Niepoprawny email lub hasło');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            timestamp: Date.now()
        };
        const token = this.jwtService.sign(payload);

        return {
            accessToken: token,
        };
    }
    }