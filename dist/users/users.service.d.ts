import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';
import { Cuidador } from '../entities/cuidador.entity';
import { Postulacion } from '../entities/postulacion.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private usuarioRepository;
    private rolRepository;
    private cuidadorRepository;
    private postulacionRepository;
    constructor(usuarioRepository: Repository<Usuario>, rolRepository: Repository<Rol>, cuidadorRepository: Repository<Cuidador>, postulacionRepository: Repository<Postulacion>);
    findAll(): Promise<{
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
    findOne(username: string): Promise<{
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
    create(createUserDto: CreateUserDto): Promise<{
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
    update(username: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(username: string): Promise<{
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
    getTotalUsers(): Promise<number>;
    getUsersByRol(nombreRol: string): Promise<number>;
    getUsersByActivo(activo: boolean): Promise<number>;
    getDashboardStats(): Promise<{
        success: boolean;
        stats: {
            totalUsers: number;
            workers: number;
            families: number;
            activeUsers: number;
        };
    }>;
}
