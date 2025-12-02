import { Rol } from './rol.entity';
import { Postulacion } from './postulacion.entity';
export declare class Usuario {
    IdUsuario: number;
    NombreUsuario: string;
    Email: string;
    Nombre: string;
    Apellido: string;
    Contraseña: string;
    IdRol: number;
    Estado: string;
    Imagen: string;
    FechaCreacion: Date;
    FechaActualizacion: Date;
    rol: Rol;
    postulaciones: Postulacion[];
}
