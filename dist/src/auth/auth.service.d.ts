import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    updateUser(userId: number, dto: UpdateUserDto): Promise<{
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
