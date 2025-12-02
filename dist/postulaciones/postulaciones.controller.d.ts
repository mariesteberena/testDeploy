import { PostulacionesService } from './postulaciones.service';
export declare class PostulacionesController {
    private readonly postulacionesService;
    constructor(postulacionesService: PostulacionesService);
    findByCuidador(idCuidador: number): Promise<{
        success: boolean;
        postulaciones: {
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
        }[];
    }>;
    create(body: any, req: any): Promise<{
        success: boolean;
        message: string;
        postulaciones?: undefined;
    } | {
        success: boolean;
        postulaciones: {
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
        }[];
        message?: undefined;
    }>;
    remove(idCuidador: number, idSolicitud: number): Promise<{
        success: boolean;
        postulaciones: {
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
        }[];
        message: string;
    }>;
}
