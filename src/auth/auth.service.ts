import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth-dto';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async register(dto: CreateAuthDto) {

        const existingUser = await this.prismaService.user.findUnique({
            where: {email: dto.email},
        });

        if (existingUser) {
            throw new ConflictException('Użytkownik z tym adresem e-mail już istnieje');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prismaService.user.create({
        data: {
            email: dto.email,
            password: hashedPassword,
        },

        select: {
            id: true,
            email: true,
            createdAt: true,
        },
        });

        return user;
    }


    async login(dto: LoginDto) {

        const user = await this.prismaService.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Niepoprawny e-mail lub hasło');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Niepoprawny e-mail lub hasło');
        }

        const payload = { sub: user.id, email: user.email, timestamp: Date.now() };
        const token = this.jwtService.sign(payload);

        return { 
            access_token: token 
        };
    }

    async update(userId: number, dto: UpdateAuthDto) {
        const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('Użytkownik nie został znaleziony');
        }

        const dataToUpdate: { 
            email?: string; 
            password?: string 
        } = {};


        if (dto.email && dto.email !== user.email) {
            
            const existingEmail = await this.prismaService.user.findUnique({
                where: { email: dto.email },
        });

            if (existingEmail) {
                throw new ConflictException('Ten adres e-mail jest już zajęty');
            }

            dataToUpdate.email = dto.email;
        }

        if (dto.password) {
            dataToUpdate.password = await bcrypt.hash(dto.password, 10);
        }

        return this.prismaService.user.update({
            where: { id: userId },
            data: dataToUpdate,
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });
  }
}
