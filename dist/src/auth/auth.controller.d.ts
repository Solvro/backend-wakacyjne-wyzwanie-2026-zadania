import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<{
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
