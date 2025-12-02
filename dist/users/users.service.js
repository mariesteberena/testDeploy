"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const fs = __importStar(require("fs"));
const path_1 = require("path");
const usuario_entity_1 = require("../entities/usuario.entity");
const rol_entity_1 = require("../entities/rol.entity");
let UsersService = class UsersService {
    constructor(usuarioRepository, rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }
    async findAll() {
        const usuarios = await this.usuarioRepository.find({
            relations: ['rol'],
            order: { FechaCreacion: 'DESC' },
        });
        const users = usuarios.map((usuario) => ({
            idUsuario: usuario.IdUsuario,
            username: usuario.NombreUsuario,
            email: usuario.Email,
            firstName: usuario.Nombre,
            lastName: usuario.Apellido,
            role: usuario.rol.NombreRol,
            status: usuario.Estado,
            image: usuario.Imagen || null,
            fechaCreacion: usuario.FechaCreacion,
            fechaActualizacion: usuario.FechaActualizacion,
        }));
        return {
            success: true,
            users,
        };
    }
    async findOne(username) {
        const usuario = await this.usuarioRepository.findOne({
            where: { NombreUsuario: username },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return {
            success: true,
            user: {
                idUsuario: usuario.IdUsuario,
                username: usuario.NombreUsuario,
                email: usuario.Email,
                firstName: usuario.Nombre,
                lastName: usuario.Apellido,
                role: usuario.rol.NombreRol,
                status: usuario.Estado,
                image: usuario.Imagen || null,
            },
        };
    }
    async create(createUserDto) {
        const existingUser = await this.usuarioRepository.findOne({
            where: [
                { NombreUsuario: createUserDto.username },
                { Email: createUserDto.email },
            ],
        });
        if (existingUser) {
            throw new common_1.ConflictException('El nombre de usuario o email ya existe');
        }
        const rol = await this.rolRepository.findOne({
            where: { NombreRol: createUserDto.role },
        });
        if (!rol) {
            throw new common_1.BadRequestException('Rol inválido');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const nuevoUsuario = this.usuarioRepository.create({
            NombreUsuario: createUserDto.username,
            Email: createUserDto.email,
            Nombre: createUserDto.firstName,
            Apellido: createUserDto.lastName,
            Contraseña: hashedPassword,
            IdRol: rol.IdRol,
            Estado: 'activo',
            Imagen: createUserDto.image || null,
        });
        const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
        return {
            success: true,
            message: 'Usuario creado exitosamente',
            user: {
                idUsuario: usuarioGuardado.IdUsuario,
                username: usuarioGuardado.NombreUsuario,
                email: usuarioGuardado.Email,
                firstName: usuarioGuardado.Nombre,
                lastName: usuarioGuardado.Apellido,
                role: createUserDto.role,
                status: usuarioGuardado.Estado,
                image: usuarioGuardado.Imagen || null,
            },
        };
    }
    async update(username, updateUserDto) {
        const usuario = await this.usuarioRepository.findOne({
            where: { NombreUsuario: username },
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (updateUserDto.username && updateUserDto.username !== username) {
            const existingUser = await this.usuarioRepository.findOne({
                where: { NombreUsuario: updateUserDto.username },
            });
            if (existingUser) {
                throw new common_1.ConflictException('El nombre de usuario ya existe');
            }
            usuario.NombreUsuario = updateUserDto.username;
        }
        if (updateUserDto.email !== undefined)
            usuario.Email = updateUserDto.email;
        if (updateUserDto.firstName !== undefined)
            usuario.Nombre = updateUserDto.firstName;
        if (updateUserDto.lastName !== undefined)
            usuario.Apellido = updateUserDto.lastName;
        if (updateUserDto.password !== undefined && updateUserDto.password !== '') {
            usuario.Contraseña = await bcrypt.hash(updateUserDto.password, 10);
        }
        if (updateUserDto.status !== undefined) {
            usuario.Estado = updateUserDto.status === 'active' ? 'activo' : 'inactivo';
        }
        if (updateUserDto.image !== undefined) {
            const imagenAnterior = usuario.Imagen;
            if (updateUserDto.image && updateUserDto.image !== imagenAnterior) {
                if (imagenAnterior && imagenAnterior.startsWith('/Imagenes/')) {
                    try {
                        const filename = imagenAnterior.replace('/Imagenes/', '');
                        const frontendPath = (0, path_1.join)(process.cwd(), '..', 'Tpe-CuidAr', 'public', 'Imagenes');
                        const filePath = (0, path_1.join)(frontendPath, filename);
                        const defaultImages = ['Admin.png', 'Trabajador.jpg', 'Trabajadora1.avif', 'Familia.jpg', 'familia2.jpg'];
                        if (fs.existsSync(filePath) && !defaultImages.includes(filename)) {
                            fs.unlinkSync(filePath);
                        }
                    }
                    catch (error) {
                        console.error('Error al eliminar imagen anterior:', error);
                    }
                }
            }
            usuario.Imagen = updateUserDto.image || null;
        }
        if (updateUserDto.role !== undefined && updateUserDto.role !== null && updateUserDto.role !== '') {
            const rol = await this.rolRepository.findOne({
                where: { NombreRol: updateUserDto.role },
            });
            if (!rol) {
                console.error(`[UPDATE USER] Rol no encontrado: ${updateUserDto.role}`);
                throw new common_1.BadRequestException(`Rol inválido: ${updateUserDto.role}`);
            }
            usuario.IdRol = rol.IdRol;
        }
        if (updateUserDto.role !== undefined && updateUserDto.role !== null && updateUserDto.role !== '') {
            await this.usuarioRepository.update({ IdUsuario: usuario.IdUsuario }, { IdRol: usuario.IdRol });
        }
        const usuarioActualizado = await this.usuarioRepository.save(usuario);
        const usuarioCompleto = await this.usuarioRepository.findOne({
            where: { IdUsuario: usuarioActualizado.IdUsuario },
            relations: ['rol'],
        });
        if (!usuarioCompleto) {
            throw new common_1.BadRequestException('Error al recargar usuario después de actualizar');
        }
        if (!usuarioCompleto.rol) {
            throw new common_1.BadRequestException('Error al recargar usuario con rol');
        }
        if (!usuarioCompleto || !usuarioCompleto.rol) {
            throw new common_1.BadRequestException('Error al recargar usuario con rol');
        }
        return {
            success: true,
            message: 'Usuario actualizado exitosamente',
            user: {
                idUsuario: usuarioCompleto.IdUsuario,
                username: usuarioCompleto.NombreUsuario,
                email: usuarioCompleto.Email,
                firstName: usuarioCompleto.Nombre,
                lastName: usuarioCompleto.Apellido,
                role: usuarioCompleto.rol.NombreRol,
                status: usuarioCompleto.Estado,
                image: usuarioCompleto.Imagen || null,
            },
        };
    }
    async remove(username) {
        const usuario = await this.usuarioRepository.findOne({
            where: { NombreUsuario: username },
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        await this.usuarioRepository.remove(usuario);
        return {
            success: true,
            message: 'Usuario eliminado exitosamente',
        };
    }
    async toggleStatus(username) {
        const usuario = await this.usuarioRepository.findOne({
            where: { NombreUsuario: username },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        usuario.Estado = usuario.Estado === 'activo' ? 'inactivo' : 'activo';
        const usuarioActualizado = await this.usuarioRepository.save(usuario);
        return {
            success: true,
            message: `Usuario ${usuarioActualizado.Estado === 'activo' ? 'activado' : 'desactivado'} exitosamente`,
            user: {
                idUsuario: usuarioActualizado.IdUsuario,
                username: usuarioActualizado.NombreUsuario,
                email: usuarioActualizado.Email,
                firstName: usuarioActualizado.Nombre,
                lastName: usuarioActualizado.Apellido,
                role: usuarioActualizado.rol.NombreRol,
                status: usuarioActualizado.Estado,
                image: usuarioActualizado.Imagen || null,
            },
        };
    }
    async getTotalUsers() {
        return await this.usuarioRepository.count();
    }
    async getUsersByRol(nombreRol) {
        const rol = await this.rolRepository.findOne({
            where: { NombreRol: nombreRol },
        });
        if (!rol) {
            return 0;
        }
        return await this.usuarioRepository.count({
            where: { IdRol: rol.IdRol },
        });
    }
    async getUsersByActivo(activo) {
        const estado = activo ? 'activo' : 'inactivo';
        return await this.usuarioRepository.count({
            where: { Estado: estado },
        });
    }
    async getDashboardStats() {
        const totalUsers = await this.getTotalUsers();
        const workers = await this.getUsersByRol('worker');
        const families = await this.getUsersByRol('family');
        const activeUsers = await this.getUsersByActivo(true);
        return {
            success: true,
            stats: {
                totalUsers,
                workers,
                families,
                activeUsers,
            },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map