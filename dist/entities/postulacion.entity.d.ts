import { Cuidador } from './cuidador.entity';
import { Usuario } from './usuario.entity';
export declare class Postulacion {
    IdPostulacion: number;
    IdCuidador: number;
    IdFamilia: number;
    IdSolicitud: number | null;
    Estado: string;
    Mensaje: string;
    FechaAlta: Date;
    cuidador: Cuidador;
    familia: Usuario;
}
