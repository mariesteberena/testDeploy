import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        user: {
            idUsuario: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
            status: string;
            image: string;
        };
    }>;
    getUser(username: string): Promise<{
        success: boolean;
        user: {
            idUsuario: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
            status: string;
            image: string;
        };
    }>;
}
