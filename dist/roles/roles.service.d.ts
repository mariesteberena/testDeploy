import { Repository } from 'typeorm';
import { Rol } from '../entities/rol.entity';
export declare class RolesService {
    private rolRepository;
    constructor(rolRepository: Repository<Rol>);
    findAll(): Promise<{
        success: boolean;
        roles: {
            idRol: number;
            nombreRol: string;
            descripcion: string;
            estado: string;
        }[];
    }>;
}
