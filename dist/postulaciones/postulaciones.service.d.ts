import { Repository } from 'typeorm';
import { Postulacion } from '../entities/postulacion.entity';
import { Cuidador } from '../entities/cuidador.entity';
import { Usuario } from '../entities/usuario.entity';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
export declare class PostulacionesService {
    private postulacionRepository;
    private cuidadorRepository;
    private usuarioRepository;
    constructor(postulacionRepository: Repository<Postulacion>, cuidadorRepository: Repository<Cuidador>, usuarioRepository: Repository<Usuario>);
    findByCuidador(idCuidador: number): Promise<{
        idPostulacion: number;
        idCuidador: number;
        idFamilia: number;
        idSolicitud: number;
        estado: string;
        mensaje: string;
        familia: {
            idUsuario: number;
            nombre: string;
            email: string;
        };
        fechaAlta: Date;
    }[]>;
    create(idCuidador: number, createPostulacionDto: CreatePostulacionDto): Promise<{
        idPostulacion: number;
        idCuidador: number;
        idFamilia: number;
        idSolicitud: number;
        estado: string;
        mensaje: string;
        familia: {
            idUsuario: number;
            nombre: string;
            email: string;
        };
        fechaAlta: Date;
    }[]>;
    remove(idCuidador: number, idSolicitud: number): Promise<{
        idPostulacion: number;
        idCuidador: number;
        idFamilia: number;
        idSolicitud: number;
        estado: string;
        mensaje: string;
        familia: {
            idUsuario: number;
            nombre: string;
            email: string;
        };
        fechaAlta: Date;
    }[]>;
}
