import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        createdAt: Date;
        id: number;
        email: string;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<{
        createdAt: Date;
        id: number;
        email: string;
        updatedAt: Date;
    }>;
}
