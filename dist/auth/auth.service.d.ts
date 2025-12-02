import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';
export declare class AuthService {
    private usuarioRepository;
    private rolRepository;
    constructor(usuarioRepository: Repository<Usuario>, rolRepository: Repository<Rol>);
    login(username: string, password: string): Promise<{
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
    getUserByUsername(username: string): Promise<{
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
