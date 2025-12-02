import { Usuario } from './usuario.entity';
import { Postulacion } from './postulacion.entity';
export declare class Cuidador {
    IdCuidador: number;
    IdUsuario: number;
    Telefono: string;
    Ubicacion: string;
    Descripcion: string;
    TipoCuidado: string;
    TarifaPorHora: number;
    AnosExperiencia: number;
    Calificacion: number;
    Estado: string;
    FechaCreacion: Date;
    FechaActualizacion: Date;
    usuario: Usuario;
    postulaciones: Postulacion[];
}
