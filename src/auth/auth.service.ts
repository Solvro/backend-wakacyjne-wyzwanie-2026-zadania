import { ConflictException, Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {}

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
    }