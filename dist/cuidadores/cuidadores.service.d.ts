import { Repository } from 'typeorm';
import { Cuidador } from '../entities/cuidador.entity';
import { Usuario } from '../entities/usuario.entity';
export declare class CuidadoresService {
    private cuidadorRepository;
    private usuarioRepository;
    constructor(cuidadorRepository: Repository<Cuidador>, usuarioRepository: Repository<Usuario>);
    findByUsuario(idUsuario: number): Promise<{
        idCuidador: number;
        idUsuario: number;
        telefono: string;
        ubicacion: string;
        descripcion: string;
        tipoCuidado: string;
        tarifaPorHora: number;
        anosExperiencia: number;
        calificacion: number;
        estado: string;
        usuario: {
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
    createOrUpdate(idUsuario: number, data: Partial<Cuidador>): Promise<{
        idCuidador: number;
        idUsuario: number;
        telefono: string;
        ubicacion: string;
        descripcion: string;
        tipoCuidado: string;
        tarifaPorHora: number;
        anosExperiencia: number;
        calificacion: number;
        estado: string;
        usuario: {
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
    update(idCuidador: number, data: Partial<Cuidador>): Promise<{
        idCuidador: number;
        idUsuario: number;
        telefono: string;
        ubicacion: string;
        descripcion: string;
        tipoCuidado: string;
        tarifaPorHora: number;
        anosExperiencia: number;
        calificacion: number;
        estado: string;
        usuario: {
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
