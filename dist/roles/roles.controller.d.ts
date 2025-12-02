import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    getAllRoles(): Promise<{
        success: boolean;
        roles: {
            idRol: number;
            nombreRol: string;
            descripcion: string;
            estado: string;
        }[];
    }>;
}
