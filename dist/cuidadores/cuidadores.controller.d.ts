import { CuidadoresService } from './cuidadores.service';
export declare class CuidadoresController {
    private readonly cuidadoresService;
    constructor(cuidadoresService: CuidadoresService);
    findByUsuario(idUsuario: number): Promise<{
        success: boolean;
        cuidador: {
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
        };
    }>;
    createOrUpdate(idUsuario: number, data: any): Promise<{
        success: boolean;
        cuidador: {
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
        };
    }>;
}
