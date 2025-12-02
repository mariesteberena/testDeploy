import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        success: boolean;
        users: {
            idUsuario: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
            status: string;
            image: string;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        }[];
    }>;
    getTotalUsers(): Promise<{
        success: boolean;
        count: number;
    }>;
    getUsersByRol(rolName: string): Promise<{
        success: boolean;
        rol: string;
        count: number;
    }>;
    getUsersByActivo(): Promise<{
        success: boolean;
        count: number;
    }>;
    getDashboardStats(): Promise<{
        success: boolean;
        stats: {
            totalUsers: number;
            workers: number;
            families: number;
            activeUsers: number;
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
    createUser(createUserDto: CreateUserDto): Promise<{
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
    updateUser(username: string, updateUserDto: UpdateUserDto): Promise<{
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
    deleteUser(username: string): Promise<{
        success: boolean;
        message: string;
    }>;
    toggleStatus(username: string): Promise<{
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
}
