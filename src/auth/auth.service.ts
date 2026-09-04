import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import {RegisterDto} from "./dto/register-user.dto";
import {DatabaseService} from "../database/database.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";
import {UpdateUserDto} from "./dto/update-user-dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
    ){}

    async register(dto: RegisterDto){
        const existingUser = await this.databaseService.user.findUnique({
            where: {Email: dto.email},
        });

        if (existingUser) {
            throw new ConflictException('Username with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);



        const user = await this.databaseService.user.create({
            data: {
                Email: dto.email,
                Password: hashedPassword,
                Name: dto.name,
            },
        });

        const { Password, ...result } = user;
        return result;
    }

    async login(dto: LoginDto) {
        const user = await this.databaseService.user.findUnique({
            where: { Email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Incorrect email or password');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.Password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Incorrect email or password');
        }

        const payload = {
            sub: user.UserID,
            email: user.Email,
            timestamp: Date.now(),
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }



    async updateProfile(userId: number, dto: UpdateUserDto) {
        const user = await this.databaseService.user.findUnique({
            where: { UserID: userId },
        });

        if (!user) {
            throw new NotFoundException('Użytkownik nie został znaleziony');
        }

        if (dto.email && dto.email !== user.Email) {
            const emailExists = await this.databaseService.user.findUnique({
                where: { Email: dto.email },
            });
            if (emailExists) {
                throw new ConflictException('Podany adres email jest już zajęty');
            }
        }

        let hashedPassword: string | undefined = undefined;
        if (dto.password) {
            hashedPassword = await bcrypt.hash(dto.password, 10);
        }

        const updatedUser = await this.databaseService.user.update({
            where: { UserID: userId },
            data: {
                ...(dto.email && { Email: dto.email }),
                ...(dto.name !== undefined && { Name: dto.name }),
                ...(hashedPassword && { Password: hashedPassword }),
            },
        });

        const { Password, ...result } = updatedUser;
        return result;
    }
}
