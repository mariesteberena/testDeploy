import { Usuario } from './usuario.entity';
export declare class Rol {
    IdRol: number;
    NombreRol: string;
    Descripcion: string;
    Estado: string;
    FechaCreacion: Date;
    FechaActualizacion: Date;
    usuarios: Usuario[];
}
